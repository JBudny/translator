import { FC, useEffect, useState } from "react";
import { TranslateButton } from "./components";
import { PositionState, SelectedTextState } from "./App.types";

const App: FC = () => {
  const [selectedText, setSelectedText] = useState<SelectedTextState>("");
  const [position, setPosition] = useState<PositionState>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseUp = ({ x, y }: MouseEvent) => {
      const currentSelectedText = window.getSelection()?.toString().trim();

      if (selectedText === currentSelectedText) {
        setSelectedText("")

        return;
      };

      setPosition({ x, y });
      setSelectedText(currentSelectedText);
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [selectedText]);

  const handleTranslationButtonClick = () => {
    setSelectedText("");
  };

  return selectedText ? (
    <div
      style={{
        position: 'absolute',
        left: `calc(${position.x}px - 15px)`,
        top: `calc(${position.y}px - 45px)`,
      }}
    >
      <TranslateButton onClick={handleTranslationButtonClick} />
    </div>
  ) : null;
};

export default App;
