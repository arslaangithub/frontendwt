import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import EditStudentForm from './components/EditStudentForm';

function App() {
  return (
    <Router>
      <div className="container">
      <h1 className="header-title">Student Management System</h1>

        <nav className="nav-bar">
  <Link to="/" className="nav-link">Student List</Link>
  <Link to="/add" className="nav-link">Add Student</Link>
</nav>

        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudentForm />} />
          <Route path="/edit/:id" element={<EditStudentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
