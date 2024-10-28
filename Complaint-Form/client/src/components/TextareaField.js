import React from 'react';

const TextareaField = ({ label, id, name, rows, placeholder, value, onChange, required }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <textarea
        className="form-control"
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default TextareaField;
