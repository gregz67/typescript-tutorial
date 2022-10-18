import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import InputField from "./InputField"

test("render", async () => {
  // ARRANGE
  render(
    <InputField
      handleAdd={() => {
        return null
      }}
    />
  )

  // ACT
  await screen.findByRole("textbox")
  await screen.findByRole("button")

  // ASSERT
  expect(screen.getByRole("textbox")).toHaveValue("")
  expect(screen.getByRole("button")).toBeEnabled()
})
