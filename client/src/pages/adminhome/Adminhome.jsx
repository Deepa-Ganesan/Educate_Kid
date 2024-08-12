import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate, useParams } from 'react-router-dom';
import './adminhome.css';
import Menu from '../menu/Menu';
import { FaHome } from 'react-icons/fa';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

const AdminHome = () => {
  const { state } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scholarshipCount, setScholarshipCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarshipCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/scholarships/count');
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setScholarshipCount(data.count);
      } catch (error) {
        console.error('Error fetching scholarship count:', error);
      }
    };

    fetchScholarshipCount();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToHome = () => {
    navigate(`/adminhome/${state}`);
  };

  const chartData = {
    labels: ['Scholarship A', 'Scholarship B', 'Scholarship C', 'Scholarship D', 'Scholarship E'],
    datasets: [
      {
        label: 'Number of Applications',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const pendingStudents = [
    {
      name: 'John Doe',
      enrollment: '12345',
      state: 'NY',
    },
    {
      name: 'Jane Smith',
      enrollment: '54321',
      state: 'CA',
    },
  ];

  const recentInstitutes = [
    {
      name: 'ABC Institute',
      code: 'INST123',              
    },
    {
      name: 'XYZ Institute',
      code: 'INST456',
    },
  ];

  return (
    <div className={`admin-dashboard ${menuOpen ? 'menu-expanded' : ''}`}>
      <Menu isExpanded={menuOpen} toggleMenu={toggleMenu} />
      <div className={`main-content ${menuOpen ? 'menu-expanded' : ''}`}>
        <div className="top-bar">
          <div className="welcome">
            Welcome to {state} Admin Dashboard
          </div>
          <div className="icons">
            <FaHome className="icon" onClick={goToHome} />
          </div>
        </div>

        <div className="stats-boxes1">
          <div className="boxi">
            <h3>Total Scholarships</h3>
            <p>{scholarshipCount}</p>
          </div>
          <div className="boxi">
            <h3>Total Pending Students</h3>
            <p>45</p>
          </div>
          <div className="boxi">
            <h3>Total Verified Students</h3>
            <p>67</p>
          </div>
          <div className="boxi">
            <h3>Total Rejected Students</h3>
            <p>8</p>
          </div>
        </div>

        <div className="content-row">
          <div className="graph">
            <h4>Mostly Applied Scholarships</h4>
            <div className="graph-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="pending-students">
            <div className="header">
              <h4>Recently Pending Students</h4>
              <button className="link-button">View All</button>
            </div>

            <div className="student-list-header">
              <p>Name</p>
              <p>Enrollment Number</p>
              <p>State</p>
              <p>Action</p>
            </div>

            <div className="student-list">
              {pendingStudents.map((student, index) => (
                <div className="student-box" key={index}>
                  <p>{student.name}</p>
                  <p>{student.enrollment}</p>
                  <p>{student.state}</p>
                  <button>View</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="recent-institute">
          <h4>Recently Added Institutes</h4>
          <div className="institute-container">
            <div className="institute-row">
              {recentInstitutes.map((institute, index) => (
                <div className="institute" key={index}>
                  <p>Name: {institute.name}</p>
                  <p>Code: {institute.code}</p>
                  <button className="view-button">View</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
