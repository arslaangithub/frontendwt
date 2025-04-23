import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Form.css'; // External CSS file for styling

function EditStudentForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`).then((res) => {
      setFormData(res.data);
    });
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentId) newErrors.studentId = 'Student ID is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.enrollmentYear || !/^\d{4}$/.test(formData.enrollmentYear)) newErrors.enrollmentYear = 'Invalid enrollment year';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        await axios.put(`http://localhost:5000/students/${id}`, formData);
        alert('Student updated successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error updating student:', error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        {Object.entries(formData).map(([key, value]) => (
          key !== '_id' && key !== '__v' && (
            key !== 'isActive' ? (
              <div key={key} className="form-group">
                <label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                {errors[key] && <span className="error-message">{errors[key]}</span>}
              </div>
            ) : (
              <div key={key} className="form-group">
                <label>Status:</label>
                <input type="checkbox" name="isActive" checked={value} onChange={handleChange} />
              </div>
            )
          )
        ))}
        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
}

export default EditStudentForm;
