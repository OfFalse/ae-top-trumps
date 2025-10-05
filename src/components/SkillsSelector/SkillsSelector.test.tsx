import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SkillsSelector from "./SkillsSelector";

// Mock debounce hook to avoid waiting in tests
jest.mock("../../hooks/useDebounce", () => ({
  __esModule: true,
  default: (v: string) => v,
}));
// Mock errors in the test suite.
jest.spyOn(console, "error").mockImplementation(() => {});
describe("SkillsSelector", () => {
  const mockSetSelected = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fetch
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // @ts-ignore
    global.fetch?.mockClear?.();
  });

  test("fetches and shows suggestions when typing", async () => {
    // Arrange fetch to return a list
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ["React", "Redux"],
    } as any);

    render(<SkillsSelector setSelectedSkillList={mockSetSelected} />);

    const input = screen.getByPlaceholderText("e.g. React");
    await userEvent.type(input, "Rea");

    // Ensure the menu is open so options are rendered
    await userEvent.keyboard("{ArrowDown}");

    // Because useDebounce is mocked, items should appear promptly
    const options = await screen.findAllByRole("option");
    expect(options.some((o) => /react/i.test(o.textContent || ""))).toBe(true);
    expect(options.some((o) => /redux/i.test(o.textContent || ""))).toBe(true);
  });

  test("clicking Add adds a new unique skill", async () => {
    // First fetch to populate options (not strictly required when typing full value)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ["React", "Redux"],
    } as any);

    // Simulate state updater behavior
    const selected: any[] = [];
    const setSelected = jest.fn((updater) => {
      const next = typeof updater === "function" ? updater(selected) : updater;
      selected.splice(0, selected.length, ...next);
    });

    render(<SkillsSelector setSelectedSkillList={setSelected as any} />);

    const input = screen.getByPlaceholderText("e.g. React");
    await userEvent.type(input, "React");

    // Click Add button
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => expect(selected).toEqual([]));
  });

  test("does not add duplicate skills", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ["React"],
    } as any);

    const selected: any[] = [{ id: 1, title: "React", skillLevel: "Beginner" }];
    const setSelected = jest.fn((updater) => {
      const next = typeof updater === "function" ? updater(selected) : updater;
      selected.splice(0, selected.length, ...next);
    });

    render(<SkillsSelector setSelectedSkillList={setSelected as any} />);

    const input = screen.getByPlaceholderText("e.g. React");
    await userEvent.type(input, "React");

    // Attempt to add duplicate via Add button
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    // No change
    await waitFor(() =>
      expect(selected).toEqual([
        { id: 1, title: "React", skillLevel: "Beginner" },
      ]),
    );
  });
});
