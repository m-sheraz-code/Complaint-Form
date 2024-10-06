import React, { useState } from 'react';
import InputField from './InputField';
import TextareaField from './TextareaField';
import FileUpload from './FileUpload';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle form submission, such as sending the formData to an API
    console.log(formData);
  };

  return (
    <form id="complaintForm" onSubmit={handleSubmit}>
      <InputField
        label="Complaint Title"
        id="title"
        name="title"
        type="text"
        placeholder="Enter the title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      
      <InputField
        label="Email ID"
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      
      <TextareaField
        label="Complaint Description"
        id="description"
        name="description"
        rows="4"
        placeholder="Describe your complaint"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      
      <FileUpload
        label="Upload Image (Optional)"
        id="image"
        name="image"
        onChange={handleFileChange}
      />
      
      <button type="submit" className="btn btn-success">Submit Complaint</button>
    </form>
  );
};

export default ComplaintForm;
