import { FC, useLayoutEffect, useRef } from "react";
import { StyledBox } from "../../../../components";
import { ClientRectAwareProps } from "./ClientRectAware.types";
import { CURSOR_OFFSET_X, CURSOR_OFFSET_Y } from "./constants";
import {
  getLeftOffset,
  getMaxHeight,
  getMaxWidth,
  getTopOffset,
} from "./utils";
import { useTheme } from "styled-components";

export const ClientRectAware: FC<ClientRectAwareProps> = ({
  children,
  position,
  render,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    palette: { gray100 },
  } = useTheme();
  const renderWithinClientRect = () => {
    if (!document.documentElement.clientWidth || !ref.current) return;
    const { clientWidth, clientHeight } = document.documentElement;
    const { innerWidth, innerHeight } = window;

    const rightScrollbarWidth = innerWidth - clientWidth;
    const bottomScrollbarHeight = innerHeight - clientHeight;

    let clientRectRef = ref.current.getBoundingClientRect();
    if (!clientRectRef) return;

    // TODO: use theme spacing for padding.
    const padding = 15;
    const MAX_CONTENT_WIDTH: number = Math.floor(clientWidth - 2 * padding);
    const MAX_CONTENT_HEIGHT: number = Math.floor(clientHeight - 2 * padding);

    const maxWidth = getMaxWidth({
      width: clientRectRef.width,
      MAX_CONTENT_WIDTH,
    });
    ref.current.style.maxWidth = maxWidth;
    clientRectRef = ref.current.getBoundingClientRect();

    const maxHeight = getMaxHeight({
      height: clientRectRef.height,
      MAX_CONTENT_HEIGHT,
    });
    ref.current.style.maxHeight = maxHeight;
    clientRectRef = ref.current.getBoundingClientRect();

    const top = getTopOffset({
      bottom: clientRectRef.bottom,
      height: clientRectRef.height,
      top: clientRectRef.top,
      bottomScrollbarHeight,
      MAX_CONTENT_HEIGHT,
      padding,
    });
    ref.current.style.top = `${top}px`;

    const left = getLeftOffset({
      left: clientRectRef.left,
      right: clientRectRef.right,
      width: clientRectRef.width,
      rightScrollbarWidth,
      MAX_CONTENT_WIDTH,
      padding,
    });
    ref.current.style.left = `${left}px`;
  };

  useLayoutEffect(() => renderWithinClientRect(), [position]);

  return (
    <StyledBox
      ref={ref}
      rounding="borderRadius2"
      style={{
        position: "fixed",
        left: `calc(${position.x}px - ${CURSOR_OFFSET_X}px)`,
        top: `calc(${position.y}px - ${CURSOR_OFFSET_Y}px)`,
        zIndex: "99999",
        overflow: "auto",
        width: "max-content",
        boxShadow: `rgba(${gray100}, 0.5) 0px 0px 5px 0px`,
      }}
      {...props}
    >
      {render(renderWithinClientRect)}
      {children}
    </StyledBox>
  );
};
