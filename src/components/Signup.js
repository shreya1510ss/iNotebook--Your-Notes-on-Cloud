import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"",email:"",password:"", cpassword:""});
    let navigate = useNavigate();

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        
      },

      body: JSON.stringify({name, email,password})
    });

    const json = await response.json();
    console.log(json);

    if(json.success){
        //Save the auth token and redirect
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert("Account created succesfully","success")



    }
    else{
        props.showAlert("Invalid credentials","danger")
    }


  }

  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
    
  }



  return (
    <div className="container mt-2" style={{ backgroundColor: "#f0f0f070", height: "100%",padding:"70px 0px", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <form onSubmit={handleSubmit}>
        <h2 className="my-2">Create an account to use iNotebook</h2>

      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
           
          />
         
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
           
          />
         
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            minLength={5}
          
          />
        </div>

        <div className="form-group">
          <label htmlFor="cpassword">Comfirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
            minLength={5}
           
          />
        </div>

        <button type="submit" className="btn btn-primary my-4" style={{ 
        backgroundColor: "#007BFF", 
        border: "none", 
        transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#28a745"} // Change to green color on mouse over
        onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"} // Revert to blue color on mouse out
    >
       
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
