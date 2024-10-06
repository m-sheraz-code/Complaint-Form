import React from 'react';

const FileUpload = ({ label, id, name, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type="file"
        className="form-control"
        id={id}
        name={name}
        onChange={onChange}
        accept="image/*"
      />
    </div>
  );
};

export default FileUpload;
