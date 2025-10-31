import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useNavigate } from "react-router-dom";

const BlinkingCursor = () => (
  <span className="inline-block w-2 h-10 sm:h-14 lg:h-16 ml-2 bg-cyan-600 animate-blink"></span>
);

const PHRASES = ["Visualize Data.", "Track Progress.", "Understand Impact."];

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
      <span className="font-momo text-4xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tighter text-gray-900">
        {currentText}
      </span>
      <BlinkingCursor />
    </div>
  );
};

const HomeView = () => {
  const navigate = useNavigate();
  const logoUrl = "src/assets/image-removebg-previeww.png";

  return (
    <Fragment>
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100 text-gray-900">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-300/30 rounded-full filter blur-[160px] opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-300/30 rounded-full filter blur-[160px] opacity-50 animate-pulse animation-delay-4000"></div>

        <div className="relative z-10 flex flex-col-reverse sm:flex-row items-center justify-between w-[90%] sm:w-[80%] lg:w-[70%] gap-10 sm:gap-16">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left max-w-md">
            <Typewriter />
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Explore rural employment insights with clarity. MGNREGA data,
              visualized for everyone.
            </p>
            <div className="mt-8">
              <button
                onClick={() => navigate("/about")}
                className="font-momo inline-block rounded-md border-2 border-gray-700 px-8 py-3 text-lg font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:scale-105 hover:border-cyan-600 hover:text-cyan-700"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative flex-shrink-0">
            <div className="absolute blur-[100px] rounded-[2rem] bg-cyan-200/30"></div>
            <img
              src={logoUrl}
              alt="Logo"
              className="relative w-[65vw] sm:w-[40vw] lg:w-[28vw] rounded-[2rem] object-contain"
              style={{
                filter:
                  "blur(1px) drop-shadow(0 0 40px rgba(175, 231, 240, 0.25))",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/FFFFFF/000000?text=LOGO";
              }}
            />
          </div>
        </div>
      </div>

      <section className="relative py-24 bg-gradient-to-b from-blue-300 via-blue-200 to-white text-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Voices from the Ground
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
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
              className={`p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 hover:scale-105 transition-transform ${t.style}`}
            >
              <p className="text-lg text-gray-800">{t.quote}</p>
              <p className="mt-2 text-base text-gray-500 italic">{t.trans}</p>
              <cite className="mt-6 block not-italic font-semibold text-gray-800">
                - {t.name}
              </cite>
              <span className="text-sm text-cyan-700">{t.loc}</span>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default HomeView;
