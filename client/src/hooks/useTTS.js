import { useState, useCallback } from 'react';

// Helper 1: Convert Base64 string to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
    return bytes.buffer;
}
function pcmToWav(pcmData, sampleRate) {
  const pcm16 = new Int16Array(pcmData);
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = pcm16.length * (bitsPerSample / 8);
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  // fmt chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  // data chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM data
  for (let i = 0; i < pcm16.length; i++) {
    view.setInt16(44 + i * 2, pcm16[i], true);
  }
    return new Blob([buffer], { type: 'audio/wav' });
}
function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
async function fetchTTSWithBackoff(url, options, retries = 3, delay = 1000) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        await new Promise(res => setTimeout(res, delay));
        return fetchTTSWithBackoff(url, options, retries - 1, delay * 2);
      }
      throw new Error(`TTS API Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    if (retries > 0) {
      await new Promise(res => setTimeout(res, delay));
      return fetchTTSWithBackoff(url, options, retries - 1, delay * 2);
    }
    console.error("TTS fetch failed after retries:", error);
    throw error;
  }
}


// The main hook
export const useTTS = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  // Stop any currently playing audio
  const stop = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const speak = useCallback(async (text, languageCode) => {
    stop(); // Stop previous audio
    setIsLoading(true);
    setError(null);

    // This is the API key for the Gemini API.
    // In many environments, this is injected automatically when left blank.
    // If it fails, it needs to be provided via a .env variable.
    // We will use the VITE_GEMINI_API_KEY from your .env file.
    // PLEASE ADD a VITE_GEMINI_API_KEY to your .env file.
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; 
    
    if (!apiKey) {
      const err = "Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.";
      console.error(err);
      setError(err);
      setIsLoading(false); // Stop loading
      throw new Error(err); // Propagate error to the component
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

    const voice = languageCode === 'mr' ? 'Kore' : 'Puck';

    const payload = {
      contents: [{
        // FIX: Simplified the text payload.
        // The "Say in a..." instruction can sometimes cause a 400 error.
        parts: [{ text: text }] 
      }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice }
          }
        }
      },
      model: "gemini-2.5-flash-preview-tts"
    };

    try {
      const result = await fetchTTSWithBackoff(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const part = result?.candidates?.[0]?.content?.parts?.[0];
      const audioData = part?.inlineData?.data;
      const mimeType = part?.inlineData?.mimeType;

      if (audioData && mimeType && mimeType.startsWith("audio/")) {
        const sampleRate = parseInt(mimeType.match(/rate=(\d+)/)[1], 10);
        const pcmData = base64ToArrayBuffer(audioData);
        const wavBlob = pcmToWav(pcmData, sampleRate);
        const newAudioUrl = URL.createObjectURL(wavBlob);
        
        setAudioUrl(newAudioUrl);
        const audio = new Audio(newAudioUrl);
        audio.play();
        setCurrentAudio(audio);
        audio.onended = () => {
          stop();
        };
      } else {
        throw new Error("Invalid audio data received from API.");
      }

    } catch (err) {
      console.error("TTS Generation Error:", err);
      setError("Sorry, could not play audio.");
      throw err; // Re-throw the error so the component can catch it
    } finally {
      setIsLoading(false);
    }
  }, [currentAudio, audioUrl]); // Dependencies for useCallback

  return { speak, stop, isLoading, error };
};

    