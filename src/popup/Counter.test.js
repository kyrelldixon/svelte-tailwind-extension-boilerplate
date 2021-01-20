import Counter from "./Counter.svelte";
import { render, fireEvent, screen } from "@testing-library/svelte";

it("increments and decrements correctly", async () => {
  render(Counter);

  const increment = screen.getByText("+");
  const decrement = screen.getByText("-");
  const counter = screen.getByTestId("counter-value");

  await fireEvent.click(increment);
  await fireEvent.click(increment);
  await fireEvent.click(increment);
  await fireEvent.click(decrement);

  expect(counter).toHaveTextContent("2");
});
