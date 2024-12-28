import React, { useState } from 'react';
import './first.css';

function Signup() {
  const [formdata, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = async(e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
     
  })
  if(!response.ok){
    throw new Error(`${response.status}`)
  }
  const result=await response.json()
  console.log(result)
} catch(error){
  console.log("Error due to :",error)
}

}
    
  return (
    <>
      <div className="signuppage">
        <form onSubmit={handleSubmit}> 
          <input
            className="name"
            type="text"
            name="username"
            placeholder="Enter your name"
            value={formdata.username}
            onChange={handleChange} 
          />
          <input
            className="name"
            type="text"
            name="email"
            placeholder="Enter Email"
            value={formdata.email}
            onChange={handleChange}
          />
          <input
            className="name"
            type="text"
            name="password"
            placeholder="Enter Password"
            value={formdata.password}
            onChange={handleChange}
          />
          <button className="name" type="submit">SignUp</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
