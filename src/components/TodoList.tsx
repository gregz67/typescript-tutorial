import React from 'react';
//import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import "./styles.css";
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  completedTodos: Todo[];
  handleDelete: (id: number) => void;
  handleEdit: (editTodo: Todo) => void;
}

const TodoList: React.FC<Props> = ({todos, completedTodos, handleDelete, handleEdit}) => {
  return (
    <div className="container">
{/*       <Droppable droppableId='TodosList'>
        {(provided, snapshot) => (
          <div
            className= {`todos ${snapshot.isDraggingOver ? "dragactive": ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          > */}
            <span className="todos__heading">Active Tasks</span>
            {
              todos.map((todo, index) => (
                <TodoItem
                  index={index}
                  todo={todo}
                  todos={todos}
                  key={todo.id}
                  otherTodos={completedTodos}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))
            }
{/*             {provided.placeholder}
          </div>
        )}
       </Droppable>
      <Droppable droppableId='TodosRemove'>
        {(provided, snapshot) => (
          <div
            className= {`todos remove ${snapshot.isDraggingOver ? "dragcomplete": ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >  */}
            <span className="todos__heading">Completed Tasks</span>
            {
              completedTodos.map((todo, index) => (
                <TodoItem
                  index={index}
                  todo={todo}
                  todos={completedTodos}
                  key={todo.id}
                  otherTodos={todos}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))
            }
{/*              {provided.placeholder}
          </div>
        )}
      </Droppable> */}
    </div> 
  )};

export default TodoList;