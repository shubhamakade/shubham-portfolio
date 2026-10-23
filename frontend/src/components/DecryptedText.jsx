import React, { useState, useEffect, useRef } from 'react';

const GLYPHS = '✦◈⬡⟁01⬢⟐XYZΩΔ';

export default function DecryptedText({ 
  text, 
  className = "", 
  speed = 38,
  maxIterations = 10,
  sequential = true,
  replayEveryMs = 4500 
}) {
  const [displayText, setDisplayText] = useState(text);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  const startDecryption = () => {
    // If reduced motion is requested, do not run cipher animation
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    let iteration = 0;
    const totalIterations = text.length * 2 + maxIterations;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (sequential && index < iteration / 2) return text[index];
            if (!sequential && iteration >= maxIterations) return text[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      iteration++;
      if (iteration > totalIterations) {
        setDisplayText(text);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, speed);
  };

  useEffect(() => {
    // Initial entrance reveal on load
    startDecryption();

    // Set up continuous cyclical replay every 4.5 seconds
    if (replayEveryMs && replayEveryMs > 0) {
      timerRef.current = setInterval(() => {
        startDecryption();
      }, replayEveryMs);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, maxIterations, sequential, replayEveryMs]);

  return (
    <span 
      className={className}
      onMouseEnter={startDecryption}
      onClick={startDecryption}
    >
      {displayText}
    </span>
  );
}
