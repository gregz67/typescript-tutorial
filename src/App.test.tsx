import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "./App"

test("render", async () => {
  // ARRANGE
  render(<App />)

  // ACT
  await screen.findByText("Todo List")

  // ASSERT
  expect(screen.getByText("Todo List")).toBeTruthy()
})
