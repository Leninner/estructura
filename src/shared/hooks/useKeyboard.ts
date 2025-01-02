import { useState, useEffect } from "react";

export const useKeyboard = (hasFinished: boolean) => {
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyPressed = event.key.toLowerCase();

      if (/^[a-z]$/.test(keyPressed)) {
        setKey(keyPressed);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [])

  if (hasFinished) {
    window.removeEventListener("keydown", () => {});
  }

  const resetKey = () => {
    setKey(null);
  }

  return { key, resetKey };
};
