export const shouldRenderContent = (): boolean => {
  const activeElement = document.activeElement;
  // Array of tags that selected text inside of could be selected without
  // triggering translation feature
  const disabledTagNames = ["INPUT", "TEXTAREA"];
  const isElementAllowedToTranslate = (element: Element): boolean =>
    !disabledTagNames.includes(element.tagName.toUpperCase());

  return activeElement !== null && isElementAllowedToTranslate(activeElement);
};
