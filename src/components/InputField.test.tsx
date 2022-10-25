import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import InputField from "./InputField"

const mockAdd = jest.fn()

const setup = () => {
  render(<InputField handleAdd={mockAdd} />)
}

test("render", async () => {
  // ARRANGE
  setup()

  // ACT
  await screen.findByRole("textbox")
  await screen.findByRole("button")

  // ASSERT
  expect(screen.getByRole("textbox")).toHaveValue("")
  expect(screen.getByRole("button")).toBeEnabled()
})

test("input text", async () => {
  // arrange
  setup()
  const input = await screen.findByRole("textbox")

  // act
  userEvent.type(input, "This is my task")

  // assert
  expect(input).toHaveValue("This is my task")
})

test("submit", async () => {
  // arrange
  setup()
  const input = await screen.findByRole("textbox")
  const button = await screen.findByRole("button")

  // act
  userEvent.type(input, "My task")
  userEvent.click(button)

  // assert
  expect(mockAdd).toHaveBeenCalled()
  expect(input).toHaveValue("")
})
