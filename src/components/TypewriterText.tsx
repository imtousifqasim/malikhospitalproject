"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
  cursorClassName?: string;
}

export default function TypewriterText({
  words,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseMs = 1800,
  className = "",
  cursorClassName = "bg-teal-500"
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];

    // When full word has been typed out, pause before deleting
    if (!isDeleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseMs);
      return () => clearTimeout(timeout);
    }

    // When word has been completely deleted, move to next word
    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // Typing or Deleting next character
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  const currentWord = words && words.length > 0 ? words[wordIndex % words.length] : "";
  const displayedText = currentWord.substring(0, subIndex);

  return (
    <span className={`inline-flex items-center align-baseline ${className}`}>
      <span>{displayedText || "\u200B"}</span>
      <span
        className={`inline-block w-[3px] h-[0.85em] ml-1 rounded-full transition-opacity duration-150 ${
          blink ? "opacity-100" : "opacity-0"
        } ${cursorClassName}`}
        aria-hidden="true"
      />
    </span>
  );
}
