import * as React from "react";
import { Todo } from "./todo.model";

interface TodoListProps {
  items: Todo[];
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {
  return (
    <React.Fragment>
      <ul>
        {items.map((todo) => (
          <li key={todo.id}>
            <span>{todo.todo}</span>
            <button onClick={onDeleteTodo.bind(null, todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default TodoList;
