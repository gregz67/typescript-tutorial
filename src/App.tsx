import React, { useReducer } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo, TodosState, TodoReducer } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const initialState: TodosState = {
    todos: []
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const handleAdd = (todoText: string) => {
    dispatch({ type: "add", payload: todoText });
  };
  const handleDelete = (id: string) => {
    dispatch({ type: "delete", payload: id });
  };
  const handleDone = (id: string) => {
    dispatch({ type: "done", payload: id });
  }
  const handleEdit = (editTodo: Todo) => {
    dispatch({ type: "edit", payload: editTodo });
  }

  const onDragEnd = (result:DropResult) => {
    const {source, destination, draggableId} = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    dispatch({ type: "done", payload: draggableId});
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Todoist</span>
        <InputField
          handleAdd={handleAdd}/>
        <TodoList
          todos={state.todos}
          handleDelete={handleDelete}
          handleDone={handleDone}
          handleEdit={handleEdit}
        />
      </div>
    </DragDropContext>
  )
}

export default App;
