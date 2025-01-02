import { useState, useEffect } from "react";

export const useKeyboard = (hasFinished: boolean) => {
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKey(event.key);  
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [])

  if (hasFinished) {
    window.removeEventListener("keydown", () => {});
  }

  return key;
};
