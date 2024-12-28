import "./home1.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [setdata, setFormData] = useState({ url: '', datasetName: '' });
    const [columns, setColumns] = useState('');
    const [inputValues, setInputValues] = useState([]);
    const [step, setStep] = useState(1); 

    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleColumnChange = (event) => {
        const numberOfColumns = event.target.value;
        setColumns(numberOfColumns);
        setInputValues(Array(Number(numberOfColumns)).fill(''));
    };

    const handleInputChange = (index, event) => {
        const newValues = [...inputValues];
        newValues[index] = event.target.value;
        setInputValues(newValues);
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const columnData = inputValues.reduce((acc, value) => {
                acc[value] = '';
                return acc;
            }, {});

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/load`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setdata),
            });
            if (!response.ok) {
                throw new Error(`${response.status}`);
            }
            const newHtml = await response.text();
            navigate('/puppeteer', {
                state: {
                    dataset_name:setdata.datasetName,
                    htmlContent: newHtml,
                    key: columns,
                    column: columnData
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleNextStep = () => {
        setStep(2); 
    };

    return (
        <div className="first">
            <p className="title" id="sub2">
                Web Scraping
            </p>
            <p className="title" id="sub">
                Tools All You Need
            </p>

            <form className="column7s" onSubmit={handlesubmit}>
                <input
                    className="columns"
                    type="text"
                    name="datasetName"
                    value={setdata.datasetName}
                    placeholder="Enter Dataset Name"
                    onChange={handlechange}
                />
                <input
                    className="columns"
                    type="text"
                    name="url"
                    value={setdata.url}
                    placeholder="Enter URL"
                    onChange={handlechange}
                />

                <input
                    className="columns"
                    type="number"
                    value={columns}
                    placeholder="Enter Column Number"
                    onChange={handleColumnChange}
                />

                {step === 2 && inputValues.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        value={value}
                        placeholder={`Enter value for column ${index + 1}`}
                        onChange={(e) => handleInputChange(index, e)}
                        className="dynamic-input"
                    />
                ))}

                {step === 1 && (
                    <button
                        type="button"
                        className="submit-button"
                        onClick={handleNextStep}
                    >
                        Next
                    </button>
                )}
                {step === 2 && (
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                )}
            </form>
        </div>
    );
}

export default Home;
