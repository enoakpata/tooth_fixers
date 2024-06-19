import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/home.css';
import logo from '../assets/ToothFixers.Ltd.png';

interface DataItem {
  id: number;
  name: string;
  middleName: string;
  surname: string;
  dob: string; 
  homeAddress: string;
  dateOfRegistration: string; 
}

const Home: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="content">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/patients/create" className="nav-link">
              Create Patient
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/records/create" className="nav-link">
              Create Record
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/patients/search" className="nav-link">
              Search Patient
            </Link>
          </li>
        </ul>
      </nav>
      <div className="data-container">
        {data.length > 0 ? (
          <ul className="data-list">
            {data.map(item => (
              <li key={item.id} className="data-item">
                <h3>{item.name} {item.middleName} {item.surname}</h3>
                <p><strong>Date of Birth:</strong> {new Date(item.dob).toLocaleDateString()}</p>
                <p><strong>Home Address:</strong> {item.homeAddress}</p>
                <p><strong>Date of Registration:</strong> {new Date(item.dateOfRegistration).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
