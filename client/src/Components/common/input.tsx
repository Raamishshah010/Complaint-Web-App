import React, { FunctionComponent, ChangeEventHandler } from "react";

interface InputProps {
  name: string;
  label: string;
  error: string;
  type: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input: FunctionComponent<InputProps> = (props) => {
  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="form-label">
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        className="form-control"
        id={props.name}
      />
    </div>
  );
};

export default Input;
