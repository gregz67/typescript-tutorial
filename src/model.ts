export interface Todo {
  id: string;
  text: string;
  isDone: boolean;
}
export interface TodosState {
  todos: Todo[];
}
type TodoActions = 
  { type: "add", payload: string } |
  { type: "edit", payload: Todo } |
  { type: "delete", payload: string } |
  { type: "done", payload: string }; 

export const TodoReducer = (state:TodosState, action: TodoActions) => {
  switch (action.type) {
    case "add":
      return {
        todos: [
          ...state.todos,
          { id: Date.now().toString(), text: action.payload, isDone: false }
        ]
      }
    case "delete":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      }
    case "edit":
      let editTodo = action.payload;
      return {
        todos: state.todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text: editTodo.text } : todo
        )
      }
    case "done":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone} : todo
        )
      }
    default:
     return state; 
  }
}
