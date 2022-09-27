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
  { type: "edit", payload: string } |
  { type: "delete" | "done", payload: number }; 

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
    /**
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
     * 
    case "done":
      return state.map((todo) =>
        todo.id !== action.payload ? { ...todo, isDone: !todo.isDone} : todo
      );
     */
    default:
     return state; 
  }
}
