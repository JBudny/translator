import { FC, HTMLAttributes } from "react";

export interface ClientRectSize {
  x: number;
  y: number;
};

export interface PositionState {
  x: number;
  y: number;
};

export interface ClientRectAwareProps extends HTMLAttributes<HTMLDivElement> {
  position: PositionState;
};
