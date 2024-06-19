import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/create-record.css';

const CreateRecord: React.FC = () => {
  const [recordData, setRecordData] = useState({
    clinicDate: '',
    natOfAilment: '',
    medsPrescribed: '',
    procedureUndertaken: '',
    dateOfNextAppt: '',
    //patientId: '' 
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecordData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/records/create', recordData); 
      console.log('Response:', response.data);
      setSuccessMessage('Record created successfully!');
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  const handleClear = () => {
    setRecordData({
      clinicDate: '',
      natOfAilment: '',
      medsPrescribed: '',
      procedureUndertaken: '',
      dateOfNextAppt: '',
      //patientId: ''
    });
    setSuccessMessage('');
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
          <h1 className="header">Clinical Record</h1>
          {successMessage && <p className="success-message">{successMessage}</p>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="clinicDate">Clinic Date:</Label>
              <Input type="date" name="clinicDate" id="clinicDate" value={recordData.clinicDate} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="natOfAilment">Nature of Ailment:</Label>
              <Input type="text" name="natOfAilment" id="natOfAilment" value={recordData.natOfAilment} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="medsPrescribed">Medications Prescribed:</Label>
              <Input type="text" name="medsPrescribed" id="medsPrescribed" value={recordData.medsPrescribed} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="procedureUndertaken">Procedure Undertaken:</Label>
              <Input type="text" name="procedureUndertaken" id="procedureUndertaken" value={recordData.procedureUndertaken} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="dateOfNextAppt">Date of Next Appointment:</Label>
              <Input type="date" name="dateOfNextAppt" id="dateOfNextAppt" value={recordData.dateOfNextAppt} onChange={handleChange} />
            </FormGroup>
           {/* <FormGroup>
              <Label for="patientId">Patient ID:</Label>
              <Input type="text" name="patientId" id="patientId" value={recordData.patientId} onChange={handleChange} />
            </FormGroup>*/}
            <Button type="submit" color="primary">Submit</Button>
            <Button type="button" color="secondary" className="clear-button" onClick={handleClear}>Clear</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateRecord;
