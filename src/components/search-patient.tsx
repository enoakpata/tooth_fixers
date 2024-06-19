import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchPatient: React.FC = () => {
    const [searchName, setSearchByName] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [updatingPatient, setUpdatingPatient] = useState<any | null>(null);
    const [updateForm, setUpdateForm] = useState<any>({});

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!searchName.trim()) {
                setErrorMessage('Please enter a valid patient name');
                return;
            }

            const response = await axios.get(`http://localhost:3000/api/patients/search/patient?name=${encodeURIComponent(searchName.trim())}`);
            console.log('Response:', response.data);

            if (response.data.length === 0) {
                setErrorMessage('No patients found with that name.');
                setSuccessMessage('');
                setSearchResults([]);
            } else {
                setSearchResults(response.data);
                setSuccessMessage('Search successful!');
                setErrorMessage('');
            }
        } catch (error) {
            console.error('Error searching patients:', error);
            setErrorMessage('Error searching patients. Please try again.');
            setSuccessMessage('');
            setSearchResults([]);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/patients/delete/${id}`);
            console.log('Delete Response:', response.data);
            setSearchResults(searchResults.filter(result => result.id !== id));
            setSuccessMessage('Patient deleted successfully!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error deleting patient:', error);
            setErrorMessage('Error deleting patient. Please try again.');
            setSuccessMessage('');
        }
    };

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.patch(`http://localhost:3000/api/patients/update/${updatingPatient.id}`, updateForm);
            console.log('Update Response:', response.data);
            setSearchResults(searchResults.map(result => result.id === updatingPatient.id ? response.data : result));
            setSuccessMessage('Patient updated successfully!');
            setErrorMessage('');
            setUpdatingPatient(null);
            setUpdateForm({});
        } catch (error) {
            console.error('Error updating patient:', error);
            setErrorMessage('Error updating patient. Please try again.');
            setSuccessMessage('');
        }
    };

    const handleEditClick = (patient: any) => {
        setUpdatingPatient(patient);
        setUpdateForm(patient);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateForm((prevForm: any) => ({
            ...prevForm,
            [name]: value
        }));
    };

    return (
        <div>
            <div className="flex justify-between items-center mt-5 mx-20">
                <h1 className="text-2xl font-bold">Clinical Records</h1>
                <Link to="/" className='bg-blue-500 text-white rounded py-2 px-4'>Homepage</Link>
            </div>
            <div className="mt-10 flex justify-center mb-5">
                <form onSubmit={handleSearch}>
                    <input
                        className='rounded-md border-2 border-black p-2 w-96 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchByName(e.target.value)}
                        placeholder="Search by patient name"
                    />
                    <button className='mx-2 bg-black text-white rounded-1.8rem py-1.4rem px-7 text-0.9rem' type="submit">Search</button>
                </form>
            </div>
            {errorMessage && (
                <div className="mx-20 text-red-500">{errorMessage}</div>
            )}
            {successMessage && (
                <div className="mx-20 text-green-500">{successMessage}</div>
            )}
            {updatingPatient && (
                <div className="flex flex-col mx-20 mt-10 bg-gray-200 p-5 rounded">
                    <h2 className="text-xl font-bold mb-5">Update Patient</h2>
                    <form onSubmit={handleUpdate}>
                        <input
                            className='mb-2 rounded-md border-2 border-black p-2 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            type="text"
                            name="name"
                            value={updateForm.name || ''}
                            onChange={handleInputChange}
                            placeholder="First Name"
                        />
                        <input
                            className='mb-2 rounded-md border-2 border-black p-2 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            type="text"
                            name="middleName"
                            value={updateForm.middleName || ''}
                            onChange={handleInputChange}
                            placeholder="Middle Name"
                        />
                        <input
                            className='mb-2 rounded-md border-2 border-black p-2 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            type="text"
                            name="surname"
                            value={updateForm.surname || ''}
                            onChange={handleInputChange}
                            placeholder="Surname"
                        />
                        <input
                            className='mb-2 rounded-md border-2 border-black p-2 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            type="text"
                            name="dateOfBirth"
                            value={updateForm.dateOfBirth || ''}
                            onChange={handleInputChange}
                            placeholder="Date of Birth"
                        />
                        <input
                            className='mb-2 rounded-md border-2 border-black p-2 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            type="text"
                            name="homeAddress"
                            value={updateForm.homeAddress || ''}
                            onChange={handleInputChange}
                            placeholder="Home Address"
                        />
                        <input
                            className='mb-2 rounded-md border-2 border-black p-2 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                            type="text"
                            name="dateOfReg"
                            value={updateForm.dateOfReg || ''}
                            onChange={handleInputChange}
                            placeholder="Date of Registration"
                        />
                        <button className='bg-green-500 text-white rounded py-2 px-4' type="submit">Update</button>
                    </form>
                </div>
            )}
            <div className='flex flex-col mx-20 mt-10'>
                <div className='flex flex-row justify-between bg-black px-10 rounded'>
                    <div className='text-white p-2'>First Name</div>
                    <div className='text-white p-2'>Middle Name</div>
                    <div className='text-white p-2'>Surname</div>
                    <div className='text-white p-2'>Date of Birth</div>
                    <div className='text-white p-2'>Home Address</div>
                    <div className='text-white p-2'>Date of Registration</div>
                    <div></div>
                </div>
                {
                    searchResults.map((result, index) => (
                        <div key={index} className='flex flex-row justify-between w-full border-b-2 border-1d3853 px-10 text-black'>
                            <div className='p-2'>{result.name}</div>
                            <div className='p-2'>{result.middleName}</div>
                            <div className='p-2'>{result.surname}</div>
                            <div className='p-2'>{result.dateOfBirth}</div>
                            <div className='p-2'>{result.homeAddress}</div>
                            <div className='p-2'>{result.dateOfReg}</div>
                            <div className='flex flex-row gap-2'>
                                <p onClick={() => handleEditClick(result)} className='flex items-center rounded bg-blue-500 text-white px-3 my-1 cursor-pointer'>Update</p>
                                <p onClick={() => handleDelete(result.id)} className='flex items-center rounded bg-red-500 text-white px-3 my-1 cursor-pointer'>Delete</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SearchPatient;
