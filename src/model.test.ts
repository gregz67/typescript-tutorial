import { Todo, TodoActions, TodosState, TodoReducer } from "./model"

// jest.mock("react-dom")

describe("Reducer", () => {
  const initialState: TodosState = {
    todos: [
      {
        id: "1",
        text: "todo",
        isDone: false,
      },
    ],
  }
  test("add", () => {
    // ARRANGE
    const initialAddState: TodosState = {
      todos: [],
    }
    const addAction: TodoActions = {
      type: "add",
      payload: "new one",
    }

    // ACT
    const result: TodosState = TodoReducer(initialAddState, addAction)

    // ASSERT
    expect(result.todos.length).toBe(1)
    expect(result.todos[0].text).toEqual("new one")
    expect(result.todos[0].isDone).toBeFalsy()
  })
  test("edit", () => {
    // ARRANGE
    const editedTodo: Todo = {
      id: "1",
      text: "edited todo",
      isDone: false,
    }
    const editAction: TodoActions = {
      type: "edit",
      payload: editedTodo,
    }

    // ACT
    const result: TodosState = TodoReducer(initialState, editAction)

    // ASSERT
    expect(result.todos.length).toBe(1)
    expect(result.todos[0].text).toEqual("edited todo")
    expect(result.todos[0].isDone).toBeFalsy()
  })
  test("delete", () => {
    // ARRANGE
    const deleteAction: TodoActions = {
      type: "delete",
      payload: "1",
    }

    // ACT
    const result: TodosState = TodoReducer(initialState, deleteAction)

    // ASSERT
    expect(result.todos.length).toBe(0)
  })
  test("done", () => {
    // ARRANGE
    const deleteAction: TodoActions = {
      type: "done",
      payload: "1",
    }

    // ACT
    const result: TodosState = TodoReducer(initialState, deleteAction)

    // ASSERT
    expect(result.todos[0].isDone).toBeTruthy()
  })
})
