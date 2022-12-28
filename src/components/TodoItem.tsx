import React, { useEffect, useRef, useState } from "react"
import { Todo } from "../model"
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from "react-icons/ai"
import "./styles.css"
import { Draggable } from "react-beautiful-dnd"

type Props = {
  index: number
  todo: Todo
  handleDelete: (id: string) => void
  handleDone: (id: string) => void
  handleEdit: (editTodo: Todo) => void
}

const TodoItem: React.FC<Props> = ({
  index,
  todo,
  handleDelete,
  handleDone,
  handleEdit,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editText, setEditText] = useState<string>(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [editMode])

  return (
    <Draggable draggableId={todo.id} index={index} key={todo.id}>
      {(provided) => (
        <form
          className="todo__item"
          onSubmit={(e) => {
            e.preventDefault()
            handleEdit({ ...todo, text: editText })
            setEditMode(false)
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          aria-label="todo item"
        >
          {editMode ? (
            <input
              ref={inputRef}
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value)
              }}
              className="todo__item--text"
            />
          ) : (
            <span className={`todo__item--text ${todo.isDone ? "done" : ""}`}>
              {todo.text}
            </span>
          )}
          <div>
            <span
              className="icon"
              aria-label="edit"
              onClick={() => {
                setEditMode(!editMode)
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="icon"
              aria-label="delete"
              onClick={() => {
                handleDelete(todo.id)
              }}
            >
              <AiFillDelete />
            </span>
            <span
              className="icon"
              aria-label="done"
              onClick={() => {
                handleDone(todo.id)
              }}
            >
              <AiOutlineCheck />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default TodoItem
