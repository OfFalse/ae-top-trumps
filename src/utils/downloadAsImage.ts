import html2canvas from "html2canvas";
import React from "react";

/**
 * Downloads a screenshot of the given HTML element.
 * @param elementRef A React ref object pointing to the HTMLElement to capture.
 * @param fileName The desired name for the downloaded image file.
 */
export const downloadAsImage = async (
  elementRef: React.RefObject<HTMLDivElement | null>,
  fileName: string,
) => {
  const element = elementRef.current;

  if (!element) {
    console.error("The element to capture could not be found.");
    return;
  }

  try {
    // 1. Wait for fonts to load.
    await document.fonts.ready;

    const canvas = await html2canvas(element, {
      scale: window.devicePixelRatio,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#f4f4f4",
      height: 250,
      width: 200,
    });

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${fileName}.png`; // Use the provided file name

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to capture screenshot:", error);
  }
};
