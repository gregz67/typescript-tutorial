import React, { useRef, useState } from 'react'
import "./styles.css";

interface Props {
  handleAdd: (todoText: string) => void;
}

const InputField: React.FC<Props> = ({ handleAdd }) => {
  const [todoText, setTodoText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        e.preventDefault();
        handleAdd(todoText);
        setTodoText("");
        inputRef.current?.blur();
      }}
    >
      <input type="input"
        value={todoText}
        onChange={
          (e) => setTodoText(e.target.value)
        }
        placeholder="Enter a task"
        ref={inputRef}
        className="input__box"
      />
      <button className="input__submit" type="submit">Go</button>
    </form>
  )
}

export default InputField