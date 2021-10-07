import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

test("renders learn react link", async () => {
  render(<App />);
  const element = screen.getAllByText(`Read More`);
  console.log(element);
  fireEvent.click(element[2]);
  const pElement = screen.getByText(/I am on the Third page/i);
  expect(pElement).toBeInTheDocument();
  const goback = screen.getByText(`Go back`);
  fireEvent.click(goback);
  const ppElement = screen.getByText(/ μαθημάτων/i);
  expect(ppElement).toBeInTheDocument();
});