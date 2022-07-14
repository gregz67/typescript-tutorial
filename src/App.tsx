import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}]);
      setTodo("");
    }
  };

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleAdd={handleAdd}/>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App;
