import { HTMLAttributes, ReactElement } from "react";
import { PositionState } from "../../App.types";

export interface ClientRectSize {
  x: number;
  y: number;
};

export interface ClientRectAwareProps extends HTMLAttributes<HTMLDivElement> {
  position: PositionState;
  render: (renderWithinClientRect: () => void) => ReactElement;
};
