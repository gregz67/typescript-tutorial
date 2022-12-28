import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { prettyDOM, within } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import App from "./App"

let activeTasks, completedTasks

test("render", async () => {
  // ARRANGE
  render(<App />)

  // ACT
  await screen.findByText("Todo List")

  // ASSERT
  expect(screen.getByText("Todo List")).toBeTruthy()
})

test("add", async () => {
  // ARRANGE
  render(<App />)
  const input = await screen.findByRole("textbox")
  const addButton = await screen.findByRole("button")

  // ACT
  userEvent.type(input, "Test task")
  userEvent.click(addButton)

  // ASSERT
  activeTasks = screen.getByLabelText("active tasks")
  expect(within(activeTasks).getByText("Test task")).toBeTruthy()
})

test("edit", async () => {
  // ARRANGE
  render(<App />)
  const addInput = await screen.findByRole("textbox")
  const addButton = await screen.findByRole("button")

  // ACT
  userEvent.type(addInput, "Test task")
  userEvent.click(addButton)
  const editLink = await screen.findByLabelText("edit")
  userEvent.click(editLink)
  const inputs = await screen.findAllByRole("textbox")
  userEvent.type(inputs[1], " edited{enter}")

  // ASSERT
  activeTasks = screen.getByLabelText("active tasks")
  expect(within(activeTasks).getByText("Test task edited")).toBeTruthy()
})

test("delete", async () => {
  // ARRANGE
  render(<App />)
  const addInput = await screen.findByRole("textbox")
  const addButton = await screen.findByRole("button")

  // ACT
  userEvent.type(addInput, "Delete me task")
  userEvent.click(addButton)
  const deleteLink = await screen.findByLabelText("delete")
  userEvent.click(deleteLink)

  // ASSERT
  activeTasks = screen.getByLabelText("active tasks")
  expect(within(activeTasks).queryByText("Delete me task")).toBeFalsy()
})

test("done link", async () => {
  // ARRANGE
  render(<App />)
  const addInput = await screen.findByRole("textbox")
  const addButton = await screen.findByRole("button")

  // ACT
  userEvent.type(addInput, "Test task")
  userEvent.click(addButton)
  const doneLink = await screen.findByLabelText("done")
  userEvent.click(doneLink)

  // ASSERT
  const activeTasks = screen.getByLabelText("active tasks")
  const completedTasks = screen.getByLabelText("completed tasks")
  expect(within(activeTasks).queryByText("Test task")).toBeFalsy()
  expect(within(completedTasks).getByText("Test task")).toBeTruthy()
})

test.skip("drag end", async () => {
  // ARRANGE
  render(<App />)
  const addInput = await screen.findByRole("textbox")
  const addButton = await screen.findByRole("button")
  const completedTasks = screen.getByLabelText("completed tasks")

  // ACT
  userEvent.type(addInput, "Test task")
  userEvent.click(addButton)
  const todoItem = screen.getByLabelText("todo item")
  fireEvent.dragStart(todoItem)
  fireEvent.dragEnter(completedTasks)
  fireEvent.drop(completedTasks)
  fireEvent.dragLeave(completedTasks)
  fireEvent.dragEnd(todoItem)

  // ASSERT
  const activeTasks = screen.getByLabelText("active tasks")
  expect(within(activeTasks).queryByText("Test task")).toBeFalsy()
  expect(within(completedTasks).getByText("Test task")).toBeTruthy()
})
