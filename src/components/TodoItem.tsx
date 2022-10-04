import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import "./styles.css";
//import { Draggable } from 'react-beautiful-dnd';

type Props = {
  index: number,
  todo: Todo,
  todos: Todo[],
  otherTodos: Todo[],
  handleDelete: (id: number) => void,
  handleEdit: (editTodo: Todo) => void,
};

const TodoItem: React.FC<Props> = ( {index, todo, todos, otherTodos, handleDelete, handleEdit}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);

  /**
   * 
   * @param id 
  const handleDone = (id: number) => {
    todos.forEach((todo: Todo, index: number) => {
      if (todo.id === id) {
        todos.splice(index, 1);
        otherTodos.splice(0, 0, {...todo, isDone: !todo.isDone});
      }
    });
    setTodos(todos);
    setOtherTodos(otherTodos);
  };
   */

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);
  

  return (
        <form
          className="todo__item"
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit({ ...todo, text: editText});
            setEditMode(false);
          }}
          >
          {
            editMode ? (
              <input
              ref={inputRef}
              value={editText}
              onChange={(e) => { setEditText(e.target.value) }}
              className="todo__item--text"
              />
            ):
              <span className = {`todo__item--text ${todo.isDone ? "done" : ""}`}>{todo.text}</span>
            }
          <div>
            <span className="icon" onClick= {() => { setEditMode(!editMode) }}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => { handleDelete(todo.id) }}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => { /* handleDone(todo.id) */ }}>
              <AiOutlineCheck />
            </span>
          </div>
        </form>
      )
    }
/*     <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form
            className={`todo__item ${snapshot.isDragging ? "drag" : ""}`}
            onSubmit={(e) => handleEdit(e, todo.id) }
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            >
            {
              edit ? (
                <input
                ref={inputRef}
                value=""
//                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value) }
                className="todo__item--text"
                />
              ):
               <span className = {`todo__item--text ${todo.isDone ? "done" : ""}`}>{todo.text}</span>
              }
            <div>
              <span className="icon" onClick= {() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}>
                <AiFillEdit />
              </span>
              <span className="icon" onClick={() => handleDelete(todo.id) }>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={() => handleDone(todo.id) }>
                <AiOutlineCheck />
              </span>
            </div>
          </form>
        )
      }
    </Draggable> 
  )
}; */

export default TodoItem;