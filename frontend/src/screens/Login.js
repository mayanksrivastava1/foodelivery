import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  // Synthetic Event
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://fooddelivery-n6xo.onrender.com/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if(json.success){
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      alert("Successfully Logged-In")
      navigate("/")
    }
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
      <div className="container">
      <form className='w-50 m-auto mt-5 border  border-success rounded' onSubmit={handleSubmit} style={{background: "#2e3332"}}>
      <div className="container"><h1 className='text-white'>Login</h1></div>
            <div className="container"><h4 className='text-white'>Fastest Food Delivery</h4></div>

            <hr className='text-white'/>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label  text-white">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label  text-white">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
          </div> 
          <button type="submit" className="btn m-2 text-white" style={{background: "#505756"}}>Submit</button>
          <Link to="/createuser" className="m-3 btn text-white" style={{background: "#505756"}}>I am a New User</Link>
        </form>
      </div>
    </>
  )
}
