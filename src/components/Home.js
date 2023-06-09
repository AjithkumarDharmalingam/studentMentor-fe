import React from 'react'
import '../styles/home.css'
import {Link} from "react-router-dom";

function Home() {
  return <>
     <div className="wrapper">
    <h3 style={{textAlign:"center"}}>Home</h3>
        <div className="elements">
            <Link to="/add-student">
                <button className="btn btn-primary">Add Student</button>
            </Link>
            <Link to="/add-mentor">
                <button className="btn btn-primary">Add Mentor</button>
            </Link>
            <Link to="/all-mentor">
                <button className="btn btn-primary">All Mentor</button>
            </Link>
            <Link to="/all-student">
                <button className="btn btn-primary">All Student</button>
            </Link>
            <Link to="/assign-students">
                <button className="btn btn-primary">Assign Students</button>
            </Link>
            <Link to="/change-mentor">
                <button className="btn btn-primary">Change Mentor</button>
            </Link>
            <Link to="/view-mentor">
                <button className="btn btn-primary">View Mentor</button>
            </Link>
        </div>
    </div>
  </>
}

export default Home