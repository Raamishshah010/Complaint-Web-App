import React, { FormEvent, Fragment, useRef } from "react";

interface NewTodoProps {
    onAddTodo: (text: string) => void;
}

const NewTodo: React.FunctionComponent<NewTodoProps> = (props) => {
  const ref = useRef<HTMLInputElement>(null);
  const submitHandler = (e: FormEvent) => {
      e.preventDefault();

      const todoText = ref.current!.value;
      props.onAddTodo(todoText);  
  };
  return (
    <Fragment>
      <form onSubmit={submitHandler}>
   
        <label htmlFor="todo">Add Todo</label>
        <input className="form-control" ref={ref} name="todo" id="todo" />
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
};

export default NewTodo;
