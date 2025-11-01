import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import DataView from "./DataView";

const BlinkingCursor = () => (
  <span className="inline-block w-2 h-10 sm:h-14 lg:h-16 ml-2 bg-cyan-600 animate-blink"></span>
);

const PHRASES = ["Your Country, Your Data.", "Track Progress.", "Understand Impact."];

const Typewriter = () => {
  const [currentText, setCurrentText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const handleTyping = useCallback(() => {
    const fullText = PHRASES[phraseIndex];
    if (isDeleting) {
      setCurrentText(fullText.substring(0, currentText.length - 1));
      setTypingSpeed(75);
    } else {
      setCurrentText(fullText.substring(0, currentText.length + 1));
      setTypingSpeed(150);
    }

    if (!isDeleting && currentText === fullText) {
      setTypingSpeed(2000);
      setIsDeleting(true);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      setTypingSpeed(500);
    }
  }, [currentText, isDeleting, phraseIndex]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [handleTyping, typingSpeed]);

  return (
    <div className="min-h-[90px] sm:min-h-[110px] lg:min-h-[130px] flex items-center">
      <span className="font-lobster text-4xl sm:text-4xl lg:text-7xl font-extrabold uppercase tracking-wider text-red-950">
        {currentText}
      </span>
      <BlinkingCursor />
    </div>
  );
};

const HomeView = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* HERO */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden text-black pt-24 animate-fadeIn">

        {/* background image */}
        <div className="absolute inset-0 bg-[url('/src/assets/bagImage.png')] bg-center bg-cover opacity-20"></div>

        {/* blur blobs */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-black/5 rounded-full filter blur-[160px] opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-black/5 rounded-full filter blur-[160px] opacity-30 animate-pulse animation-delay-4000"></div>

        {/* content */}
        <div className="relative z-10 flex flex-col items-center text-center w-[90%] sm:w-[80%] lg:w-[70%] gap-8 animate-fadeIn">
          <Typewriter />
          <p className="mt-4 text-xl sm:text-2xl lg:text-4xl font-momo text-black">
            Explore rural employment insights with clarity. MGNREGA data visualized for everyone.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 font-momo inline-block rounded-md border-2 border-black px-12 py-4 text-2xl text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-black hover:text-beige"
          >
            Learn More
          </button>
        </div>
      </div>

      <section className="relative py-24 bg-beige text-black overflow-hidden animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-lobster sm:text-5xl font-bold text-black">
            Voices from the Ground
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl font-bold text-black">
            Real stories from communities impacted by MGNREGA.
          </p>
        </div>

        <div className="relative mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              quote:
                "“इस योजना ने हमारे गाँव को बदल दिया है। हमें अपने घर के पास ही काम मिला और हमारे बच्चे अब स्कूल जा सकते हैं।”",
              trans:
                "“This scheme has changed our village. We got work near our home, and our children can now go to school.”",
              name: "Anita Devi",
              loc: "Jaipur, Rajasthan",
              style: "rotate-1 translate-y-3",
            },
            {
              quote:
                "“पावसाळ्यात शेती नव्हती तेव्हा या कामानेच आम्हाला आधार दिला. तलावाचे काम केल्यामुळे आता पिण्याच्या पाण्याची सोय झाली आहे.”",
              trans:
                "“When there was no farm work in the monsoon, this scheme supported us. Because we worked on the pond, we now have drinking water.”",
              name: "Suresh Patil",
              loc: "Beed, Maharashtra",
              style: "-rotate-2 -translate-y-4",
            },
            {
              quote:
                "“અમને જે પૈસા મળ્યા તેનાથી અમે અમારા ઘરનું સમારકામ કરાવ્યું. આ અમારા માટે મોટી રાહત છે.”",
              trans:
                "“With the money we earned, we repaired our house. This is a big relief for us.”",
              name: "Ramesh Vala",
              loc: "Kutch, Gujarat",
              style: "rotate-3 translate-y-2",
            },
          ].map((t, i) => (
            <div
              key={i}
              className={`p-6 bg-white  text-black rounded-2xl shadow-lg border-2 border-black/20 hover:scale-105 transition-transform animate-fadeIn ${t.style}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-lg font-bold text-black">{t.quote}</p>
              <p className="mt-2 text-base font-bold text-black/80 italic">{t.trans}</p>
              <cite className="mt-6 block not-italic font-bold text-black">
                - {t.name}
              </cite>
              <span className="text-sm font-bold text-black">{t.loc}</span>
            </div>
          ))}
        </div>
      </section>
      
      <DataView />
    </Fragment>
  );
};

export default HomeView;
