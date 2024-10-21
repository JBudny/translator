const isTooWide = (width: number, MAX_CONTENT_WIDTH: number) => Math.floor(width) >= MAX_CONTENT_WIDTH;
const isTooHigh = (height: number, MAX_CONTENT_HEIGHT: number) => Math.floor(height) >= MAX_CONTENT_HEIGHT;

export const getTopOffset = ({
  bottom,
  height,
  top,
  bottomScrollbarHeight,
  MAX_CONTENT_HEIGHT,
  padding,
}: {
  bottom: number;
  height: number;
  top: number;
  bottomScrollbarHeight: number;
  MAX_CONTENT_HEIGHT: number;
  padding: number;
}) => {
  let offset = top;

  //is above client rect
  if (top < padding)
    return offset = padding;

  //is below client rect
  if (bottom > innerHeight - (bottomScrollbarHeight + padding)) {
    if (isTooHigh(height, MAX_CONTENT_HEIGHT))
      return offset = padding;

    return offset = innerHeight - height - padding - bottomScrollbarHeight;
  }

  return offset;
};

export const getLeftOffset = ({
  left,
  right,
  MAX_CONTENT_WIDTH,
  padding,
  rightScrollbarWidth,
  width,
}: {
  left: number;
  right: number;
  MAX_CONTENT_WIDTH: number;
  padding: number;
  rightScrollbarWidth: number;
  width: number;
}) => {
  let offset = left;

  //is right of client rect
  if (right > innerWidth - (rightScrollbarWidth + padding)) {
    if (isTooWide(width, MAX_CONTENT_WIDTH))
      return offset = padding;

    return offset = innerWidth - width - padding - rightScrollbarWidth;
  }

  //is left of client rect
  if (left < padding)
    return offset = padding;

  return offset;
};

export const getMaxWidth = ({
  MAX_CONTENT_WIDTH,
  width,
}: {
  MAX_CONTENT_WIDTH: number;
  width: number;
}) => {
  let maxWidth = '75ch';

  if (isTooWide(width, MAX_CONTENT_WIDTH))
    return maxWidth = `${MAX_CONTENT_WIDTH}px`;

  return maxWidth;
};

export const getMaxHeight = ({
  height,
  MAX_CONTENT_HEIGHT,
}: {
  height: number;
  MAX_CONTENT_HEIGHT: number;
}) => {
  let maxHeight = 'none';

  if (isTooHigh(height, MAX_CONTENT_HEIGHT))
    return maxHeight = `${MAX_CONTENT_HEIGHT}px`;

  return maxHeight;
};
