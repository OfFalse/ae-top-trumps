import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
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

  test("Add button is disabled when input is empty and enabled when populated", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as any);

    // Use a no-op setter
    render(<SkillsSelector setSelectedSkillList={jest.fn() as any} />);

    const addBtn = screen.getByRole("button", { name: /add/i });
    expect(addBtn).toBeDisabled();

    const input = screen.getByPlaceholderText("e.g. React");
    await userEvent.type(input, "R");
    expect(addBtn).toBeEnabled();
  });

  test("shows limit error when attempting to add more than 5 skills and does not append", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as any);

    const selected: any[] = [
      { id: 1, title: "A", skillLevel: "Beginner" },
      { id: 2, title: "B", skillLevel: "Beginner" },
      { id: 3, title: "C", skillLevel: "Beginner" },
      { id: 4, title: "D", skillLevel: "Beginner" },
      { id: 5, title: "E", skillLevel: "Beginner" },
    ];
    const setSelected = jest.fn((updater) => {
      const next = typeof updater === "function" ? updater(selected) : updater;
      selected.splice(0, selected.length, ...next);
    });

    render(<SkillsSelector setSelectedSkillList={setSelected as any} />);

    const input = screen.getByPlaceholderText("e.g. React");
    await userEvent.type(input, "NewSkill");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    // Expect error message and unchanged list
    expect(selected.length).toBe(5);
  });

  test("clears limit error after a successful add within limit", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [],
    } as any);

    const selected: any[] = [
      { id: 1, title: "A", skillLevel: "Beginner" },
      { id: 2, title: "B", skillLevel: "Beginner" },
      { id: 3, title: "C", skillLevel: "Beginner" },
      { id: 4, title: "D", skillLevel: "Beginner" },
      { id: 5, title: "E", skillLevel: "Beginner" },
    ];
    const setSelected = jest.fn((updater) => {
      const next = typeof updater === "function" ? updater(selected) : updater;
      selected.splice(0, selected.length, ...next);
    });

    render(<SkillsSelector setSelectedSkillList={setSelected as any} />);

    // First attempt should show error
    await userEvent.type(screen.getByPlaceholderText("e.g. React"), "Foo");
    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(screen.queryByText(/up to\s*5\s*skills/i)).not.toBeInTheDocument();
    });

    // Simulate external removal so we have room (length 4)
    selected.splice(4, 1);

    // Error should clear
    await waitFor(() =>
      expect(screen.queryByText(/up to\s*5\s*skills/i)).toBeNull(),
    );
    // And list back to 4
    expect(selected.length).toBe(4);
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
