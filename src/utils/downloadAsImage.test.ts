import html2canvas from "html2canvas";
import { downloadAsImage } from "./downloadAsImage";

// Mock html2canvas
jest.mock("html2canvas", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("downloadAsImage", () => {
  let consoleErrorSpy: jest.SpyInstance;
  let createElementSpy: jest.SpyInstance;
  let appendChildSpy: jest.SpyInstance;
  let removeChildSpy: jest.SpyInstance;
  let clickSpy: jest.SpyInstance;

  const mockCanvas = {
    toDataURL: jest.fn().mockReturnValue("data:image/png;base64,mock-data"),
  };

  beforeAll(() => {
    // Mock document.fonts.ready
    Object.defineProperty(document, "fonts", {
      value: {
        ready: Promise.resolve(),
      },
      writable: true,
    });

    // Mock window.devicePixelRatio
    Object.defineProperty(window, "devicePixelRatio", {
      value: 2,
      writable: true,
    });
  });

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Spy on console.error
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Mock the link element and its methods
    clickSpy = jest.fn();
    const mockLink = {
      href: "",
      download: "",
      click: clickSpy,
    };

    // Spy on DOM methods
    createElementSpy = jest
      .spyOn(document, "createElement")
      .mockReturnValue(mockLink as unknown as HTMLAnchorElement);
    appendChildSpy = jest
      .spyOn(document.body, "appendChild")
      .mockImplementation(() => {});
    removeChildSpy = jest
      .spyOn(document.body, "removeChild")
      .mockImplementation(() => {});

    // Setup html2canvas mock to resolve with the mock canvas
    (html2canvas as jest.Mock).mockResolvedValue(
      mockCanvas as unknown as HTMLCanvasElement,
    );
  });

  afterEach(() => {
    // Restore all spies
    jest.restoreAllMocks();
  });

  it("should log an error if the element ref is null", async () => {
    const elementRef = { current: null };
    await downloadAsImage(elementRef, "test-file");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "The element to capture could not be found.",
    );
    expect(html2canvas).not.toHaveBeenCalled();
  });

  it("should call html2canvas with the correct element and options", async () => {
    const divElement = document.createElement("div");
    const elementRef = { current: divElement };
    const fileName = "my-card";

    await downloadAsImage(elementRef, fileName);

    expect(html2canvas).toHaveBeenCalledWith(divElement, {
      scale: window.devicePixelRatio,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#f4f4f4",
      height: 250,
      width: 200,
    });
  });

  it("should create, click, and remove a download link", async () => {
    const divElement = document.createElement("div");
    const elementRef = { current: divElement };
    const fileName = "my-card";

    await downloadAsImage(elementRef, fileName);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    const link = createElementSpy.mock.results[0].value;

    expect(link.href).toBe("data:image/png;base64,mock-data");
    expect(link.download).toBe(`${fileName}.png`);

    expect(appendChildSpy).toHaveBeenCalledWith(link);
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalledWith(link);
  });

  it("should log an error if html2canvas fails", async () => {
    const error = new Error("html2canvas failed");
    (html2canvas as jest.Mock).mockRejectedValue(error);

    const divElement = document.createElement("div");
    const elementRef = { current: divElement };

    await downloadAsImage(elementRef, "test-file");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to capture screenshot:",
      error,
    );
    expect(appendChildSpy).not.toHaveBeenCalled();
  });
});
