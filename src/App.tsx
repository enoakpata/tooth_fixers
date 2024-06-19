import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/components/home.tsx';
import CreatePatient from '../src/components/create-patient.tsx';
import CreateRecord from '../src/components/create-record.tsx';
import SearchPatient from '../src/components/search-patient.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="patients/create" element = {<CreatePatient/>} />
        <Route path="records/create" element = {<CreateRecord/>} />
        <Route path="/patients/search" element = {<SearchPatient/>} />
      </Routes>
    </Router>
  );
};
export default App;