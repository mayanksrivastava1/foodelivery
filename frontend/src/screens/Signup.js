import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",location:""})
        let navigate = useNavigate()

    // Synthetic Event
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://food-delivery-g1pk.onrender.com/api/createuser",{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location})
        })
        const json = await response.json();
        console.log(json);

        if(!json.success)
        {
            alert("Enter Valid Credentials");
        }
        if(json.success){
            alert("Successfully Signed Up, Please login")
            navigate('/login')
        }
    }
    const onChange = (event)=>{
        setcredentials({...credentials,[event.target.name] : event.target.value})
    }
    return (
        <>
            
            <div className="container">
                
            <form  className='w-50 m-auto mt-5 border border-success rounded' onSubmit={handleSubmit} style={{background: "#2e3332"}}>
            <div className="container"><h1 className='text-white'>SignUp</h1></div>
            <div className="container"><h4 className='text-white'>Fastest Food Delivery</h4></div>

            <hr className='text-white'/>
                <div className="m-3">
                    <label htmlFor="name" className='form-label text-white'>Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-white">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputAddress1" className="form-label text-white">Address</label>
                    <input type="text" className="form-control" id="exampleInputAddress1" name='location' value={credentials.location} onChange={onChange}/>
                </div>
                <button type="submit" className=" m-2 btn text-white" style={{background: "#505756"}}>Submit</button>
                <Link to="/login " className="m-3 btn text-white" style={{background: "#505756"}}>Already a User</Link>
            </form>
            </div>
        </>
    )
}
