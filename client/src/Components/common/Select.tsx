import React, { FunctionComponent, ChangeEventHandler } from "react";

interface SelectProps {
  data: Array<any>;
  name: string;
  label: string;
  error: string;
  searchKey: string;
  searchValue: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const Select: FunctionComponent<SelectProps> = ({
  data,
  searchKey,
  error,
  name,
  label,
  searchValue,
  onChange,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="col-form-label font-weight-bold">
        {label}
      </label>

      <select
        name={name}
        {...rest}
        onChange={onChange}
        className="form-control"
      >
        <option value="">Search {label}</option>
        {data.map((e, i) => (
          <option key={i} value={e[searchKey]}>
            {typeof searchValue !== "undefined"
              ? e[searchValue]
              : e.title}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Select;
