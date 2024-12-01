import { HTMLAttributes } from "react";
import { FallbackProps } from "react-error-boundary";

export interface PositionState {
  x: number;
  y: number;
};

export interface AppProps extends HTMLAttributes<HTMLDivElement> { };

export interface RenderErrorFallbackComponentProps extends FallbackProps {
  contentUpdateCallback?: () => void;
};
