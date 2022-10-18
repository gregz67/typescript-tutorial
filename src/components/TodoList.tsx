import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { Todo } from "../model"
import "./styles.css"
import TodoItem from "./TodoItem"

interface Props {
  todos: Todo[]
  handleDelete: (id: string) => void
  handleDone: (id: string) => void
  handleEdit: (editTodo: Todo) => void
}

const TodoList: React.FC<Props> = ({
  todos,
  handleDelete,
  handleDone,
  handleEdit,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos
              .filter((todo) => !todo.isDone)
              .map((todo, index) => (
                <TodoItem
                  index={index}
                  todo={todo}
                  key={todo.id}
                  handleDelete={handleDelete}
                  handleDone={handleDone}
                  handleEdit={handleEdit}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {todos
              .filter((todo) => todo.isDone)
              .map((todo, index) => (
                <TodoItem
                  index={index}
                  todo={todo}
                  key={todo.id}
                  handleDelete={handleDelete}
                  handleDone={handleDone}
                  handleEdit={handleEdit}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodoList
