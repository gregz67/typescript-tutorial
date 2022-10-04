import React, { useReducer } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo, TodosState, TodoReducer } from './model';
//import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const initialState: TodosState = {
    todos: [],
    completedTodos: []
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const handleAdd = (todoText: string) => {
    dispatch({ type: "add", payload: todoText});
  };
  const handleDelete = (id: number) => {
    dispatch({ type: "delete", payload: id});
  };
  const handleEdit = (editTodo: Todo) => {
    dispatch({ type: "edit", payload: editTodo });
  }

  /**
   * 
  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    let
      active: Todo[] = todos,
      draggedTodoItem: Todo,
      complete: Todo[] = completedTodos;
    
    if (source.droppableId === "TodosList") {
      draggedTodoItem = active[source.index];
      active.splice(source.index, 1);
    } else {
      draggedTodoItem = complete[source.index];
      complete.splice(source.index, 1);
    }


    if (destination.droppableId === "TodosList") {
      draggedTodoItem.isDone = false;
      active.splice(destination.index, 0, draggedTodoItem);
    } else {
      draggedTodoItem.isDone = true;
      complete.splice(destination.index, 0, draggedTodoItem);
    }

    setCompletedTodos(complete);
    setTodos(active);

  }
   */

  return (
    /**
     * 
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Todoist</span>
        <InputField
          todoText={todoText}
          setTodoText={setTodoText}
          handleAdd={handleAdd}/>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
     */
    <div className="App">
      <span className="heading">Todoist</span>
      <InputField
        handleAdd={handleAdd}/>
      <TodoList
        todos={state.todos}
        completedTodos={state.completedTodos}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  )
}

export default App;
