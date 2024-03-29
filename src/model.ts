export interface Todo {
  id: string
  text: string
  isDone: boolean
}
export interface TodosState {
  todos: Todo[]
}
export type TodoActions =
  | { type: "add"; payload: string }
  | { type: "edit"; payload: Todo }
  | { type: "delete"; payload: string }
  | { type: "done"; payload: string }

export const TodoReducer = (
  state: TodosState,
  action: TodoActions
): TodosState => {
  switch (action.type) {
    case "add":
      return {
        todos: [
          ...state.todos,
          { id: Date.now().toString(), text: action.payload, isDone: false },
        ],
      }
    case "delete":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    case "edit": {
      const editTodo = action.payload
      return {
        todos: state.todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text: editTodo.text } : todo
        ),
      }
    }
    case "done":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
      }
  }
}
