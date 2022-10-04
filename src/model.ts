export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}
export interface TodosState {
  todos: Todo[];
  completedTodos: Todo[];
}
type TodoActions = 
  { type: "add", payload: string } |
  { type: "edit", payload: Todo } |
  { type: "delete", payload: number } |
  { type: "done", payload: number }; 

export const TodoReducer = (state:TodosState, action: TodoActions) => {
  switch (action.type) {
    case "add":
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, isDone: false }
        ],
        completedTodos: state.completedTodos
      }
    case "delete":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        completedTodos: state.completedTodos.filter((todo) => todo.id !== action.payload)
      }
    case "edit":
      let editTodo = action.payload;
      return {
        todos: state.todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text: editTodo.text } : todo
        ),
        completedTodos: state.completedTodos.map((completedTodo) =>
          completedTodo.id === editTodo.id ? { ...completedTodo, text: editTodo.text } : completedTodo
        ),
      }
    /**
    case "done":
      return state.map((todo) =>
        todo.id !== action.payload ? { ...todo, isDone: !todo.isDone} : todo
      );
     */
    default:
     return state; 
  }
}
