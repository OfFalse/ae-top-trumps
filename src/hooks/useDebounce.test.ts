import { renderHook, act } from "@testing-library/react";
import useDebounce from "./useDebounce";

describe("useDebounce", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should not update the value before the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } },
    );

    rerender({ value: "updated", delay: 500 });

    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(result.current).toBe("initial");
  });

  it("should update the value after the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } },
    );

    rerender({ value: "updated", delay: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("should reset the timer if the value changes again within the delay period", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "first", delay: 500 } },
    );

    rerender({ value: "second", delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Value should not have updated yet
    expect(result.current).toBe("first");

    rerender({ value: "third", delay: 500 });

    // Timer is reset, so value should still be the initial one
    expect(result.current).toBe("first");

    act(() => {
      // Not enough time has passed for the new timer
      jest.advanceTimersByTime(499);
    });
    expect(result.current).toBe("first");

    act(() => {
      // Now enough time has passed for the timer set for "third"
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe("third");
  });

  it("should handle changes in the delay prop", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 1000 } },
    );

    rerender({ value: "updated", delay: 200 });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe("updated");
  });

  it("should clear the timeout on unmount", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
    const { unmount } = renderHook(() => useDebounce("test", 500));

    expect(clearTimeoutSpy).not.toHaveBeenCalled();

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    clearTimeoutSpy.mockRestore();
  });
});
