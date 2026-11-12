import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, Sparkles, Volume2, MoonStar } from "lucide-react";
import "./styles.css";

const VIDEO_URL = "https://www.youtube.com/watch?v=qELzw02BARw";
const VIDEO_ID = "qELzw02BARw";

function App() {
  const invitationRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [seconds, setSeconds] = useState(4);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = invitationRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !seen) {
        setSeen(true);
      }
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [seen]);

  useEffect(() => {
    if (!seen || ready) return;
    if (seconds <= 0) {
      setReady(true);
      return;
    }
    const timer = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seen, seconds, ready]);

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Stillpoint home">
          <span className="brand-mark"><MoonStar size={17} /></span>
          <span>STILLPOINT<span className="brand-dot">.</span></span>
        </a>
        <a className="nav-link" href="#experience">THE EXPERIENCE <ArrowUpRight size={14} /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span className="eyebrow-line" /> A MOMENT FOR YOU <span className="eyebrow-line" /></div>
        <h1>Recharge your<br /><span>subconscious mind.</span></h1>
        <p className="hero-copy">Let the noise soften. Give your thoughts room to settle, and make space for a clearer, calmer you.</p>
        <a className="scroll-cue" href="#experience"><span className="scroll-icon"><ArrowDown size={15} /></span><span>SCROLL TO RESET</span></a>
      </section>

      <section className="experience shell" id="experience">
        <div className="section-heading">
          <div>
            <div className="eyebrow left"><span className="eyebrow-line" /> YOUR RESET STARTS HERE</div>
            <h2>Press pause.<br /><em>Come back to yourself.</em></h2>
          </div>
          <p className="section-note">Find a comfortable position, take a slow breath, and let this moment be yours.</p>
        </div>

        <div className="video-frame">
          <div className="video-topline"><span><span className="live-dot" /> GUIDED VISUAL EXPERIENCE</span><span className="duration">A FEW MINUTES FOR YOU</span></div>
          <div className="video-wrap">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
              title="Recharge your subconscious mind"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="video-caption"><span><Volume2 size={15} /> Settle in and listen</span><span>TAKE YOUR TIME · NO RUSH</span></div>
        </div>
      </section>

      <section className="invitation shell" ref={invitationRef}>
        <div className="invitation-orb"><Sparkles size={21} strokeWidth={1.4} /></div>
        <div className="eyebrow"><span className="eyebrow-line" /> A LITTLE SOMETHING TO TAKE WITH YOU</div>
        <h2>What if the next few minutes<br /><em>could shift the rest of your day?</em></h2>
        <p className="invitation-copy">Stay curious. Give yourself permission to go a little deeper. Your next moment of clarity might be one click away.</p>

        <div className={`reveal-area ${ready ? "is-ready" : ""}`} aria-live="polite">
          {!ready ? (
            <div className="waiting">
              <span className="countdown">{seen ? seconds : "—"}</span>
              <span>{seen ? "Take one more slow breath…" : "Your invitation will appear here"}</span>
              <div className="progress-track"><span style={{ width: `${seen ? ((4 - seconds) / 4) * 100 : 0}%` }} /></div>
            </div>
          ) : (
            <div className="cta-reveal">
              <p className="cta-kicker">WHEN YOU'RE READY</p>
              <a className="watch-button" href={VIDEO_URL} target="_blank" rel="noreferrer">
                Explore the full experience <ArrowUpRight size={18} />
              </a>
              <span className="cta-footnote">A small step toward a more intentional you.</span>
            </div>
          )}
        </div>
      </section>

      <footer className="footer shell">
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><MoonStar size={15} /></span><span>STILLPOINT<span className="brand-dot">.</span></span></a>
        <span>MAKE SPACE FOR WHAT MATTERS.</span>
        <a href="#top" className="back-top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);