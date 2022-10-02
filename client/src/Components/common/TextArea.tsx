import React, { FunctionComponent, ChangeEventHandler } from "react";

interface InputProps {
  name: string;
  label: string;
  error: string;
  type: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const TextArea: FunctionComponent<InputProps> = ({
  name,
  label,
  error,
  type,
  onChange,
  ...rest
}) => {
  return (
    <div className="form-group row">
      <label className="ml-3 font-weight-bold">{label}</label>
      <div className="col-sm-12">
        <textarea
          className="form-control"
          id={name}
          name={name}
          rows={6}
          onChange={onChange}
          {...rest}
        ></textarea>
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
};

export default TextArea;
