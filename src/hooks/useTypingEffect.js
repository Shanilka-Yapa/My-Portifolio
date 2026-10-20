import { useEffect, useState } from "react";

export function useTypingEffect(messages, { typingSpeed = 55, deletingSpeed = 35, pauseDuration = 1200 } = {}) {
  const [text, setText] = useState(messages[0] ?? "");

  useEffect(() => {
    if (!messages.length) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setText(messages[0]);
      return undefined;
    }

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const phrase = messages[phraseIndex];

      if (!deleting) {
        characterIndex += 1;
        setText(phrase.slice(0, characterIndex));
        if (characterIndex >= phrase.length) {
          deleting = true;
          timeoutId = window.setTimeout(tick, pauseDuration);
          return;
        }
      } else {
        characterIndex -= 1;
        setText(phrase.slice(0, characterIndex));
        if (characterIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % messages.length;
        }
      }

      timeoutId = window.setTimeout(
        tick,
        deleting ? deletingSpeed : typingSpeed,
      );
    };

    setText("");
    timeoutId = window.setTimeout(tick, typingSpeed);
    return () => window.clearTimeout(timeoutId);
  }, [messages, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}
