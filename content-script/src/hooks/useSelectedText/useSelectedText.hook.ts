import { useEffect, useState } from "react";
import { SelectedTextState } from "./useSelectedText.types";
import { PositionState } from "../../App.types";

const INITIAL_POSITION: PositionState = { x: 0, y: 0 };

export const useSelectedText = () => {
  const [position, setPosition] = useState<PositionState>(INITIAL_POSITION);
  const [selectedText, setSelectedText] = useState<SelectedTextState>();

  useEffect(() => {
    const handleMouseUp = ({ x, y }: MouseEvent) => {
      const currentSelectedText = window.getSelection()?.toString().trim();
      if (selectedText === currentSelectedText) return;
      setPosition({ x, y });
      setSelectedText(currentSelectedText);
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [selectedText]);

  return { position, selectedText, setSelectedText };
};
