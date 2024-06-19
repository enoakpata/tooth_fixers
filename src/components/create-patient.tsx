import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/create-patient.css';

const CreatePatient: React.FC = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    middleName: '',
    surname: '',
    dateOfBirth: '',
    homeAddress: '',
    dateOfReg: '',
    _22120612872: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/patients/create', patientData);
      setSuccessMessage('Patient created successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error creating patient. Please try again.');
      setSuccessMessage('');
      console.error('Error creating patient:', error);
    }
  };

  const handleClear = () => {
    setPatientData({
      name: '',
      middleName: '',
      surname: '',
      dateOfBirth: '',
      homeAddress: '',
      dateOfReg: '',
      _22120612872: ''
    });
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item nav-right">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
          <h1 className="header">Patient Biodata</h1>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Form onSubmit={handleSubmit} className="form-container">
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input type="text" name="name" id="name" value={patientData.name} onChange={handleChange} placeholder="Patient's name" />
            </FormGroup>
            <FormGroup>
              <Label for="middleName">Middle Name:</Label>
              <Input type="text" name="middleName" id="middleName" value={patientData.middleName} onChange={handleChange} placeholder="Patient's middle name" />
            </FormGroup>
            <FormGroup>
              <Label for="surname">Surname:</Label>
              <Input type="text" name="surname" id="surname" value={patientData.surname} onChange={handleChange} placeholder="Patient's surname" />
            </FormGroup>
            <FormGroup>
              <Label for="dateOfBirth">Date of Birth:</Label>
              <Input type="date" name="dateOfBirth" id="dateOfBirth" value={patientData.dateOfBirth} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="homeAddress">Home Address:</Label>
              <Input type="text" name="homeAddress" id="homeAddress" value={patientData.homeAddress} onChange={handleChange} placeholder="Patient's home address" />
            </FormGroup>
            <FormGroup>
              <Label for="dateOfReg">Date of Registration:</Label>
              <Input type="date" name="dateOfReg" id="dateOfReg" value={patientData.dateOfReg} onChange={handleChange} />
            </FormGroup>
            <Button type="submit" color="primary" className="submit-button">Submit</Button>
            <Button type="button" color="primary" className="clear-button" onClick={handleClear}>Clear</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
  
};

export default CreatePatient;
