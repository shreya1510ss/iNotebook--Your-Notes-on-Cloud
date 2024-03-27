import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from "./context/notes/NoteState";
import Alert from './components/Alert';
import React, {useState,useEffect} from "react";
import Layout from './components/Layout/Layout'; // 

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const isFirstTime = localStorage.getItem('isFirstTime');

    // Check if it's the first time opening the app
    if (!isFirstTime) {
      // Clear local storage if it's the first time
      localStorage.clear();
      // Set the flag to indicate that the app has been opened once
      localStorage.setItem('isFirstTime', true);
    }
  }, []);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <Layout>
    <NoteState>
     <Router>
     <Navbar/>
     <Alert alert={alert}/>
     <div className="container">
        <Routes>
          <Route exact path="/" element={<Home  showAlert={showAlert}/>} />
          <Route  exact path="/about" element={<About />} />
          <Route  exact path="/login" element={<Login   showAlert={showAlert}/>} />
          <Route  exact path="/signup" element={<Signup   showAlert={showAlert}/>} />
        </Routes>
        </div>
      </Router>
      </NoteState>
      </Layout>
    
    </>
  );
}

export default App;
