import React from 'react'
import {useState,useEffect} from "react";
import axios from "axios";
import { url } from '../App';

function Addstudent() {

  let [sName,setsName]=useState("");
  let [mName,setmName]=useState("");
  let [user,setUser]=useState([]);
  let [res,setRes]=useState("");
  useEffect(()=>{
      getAllMentors()
  },[])
  const getAllMentors = async()=>{//to get all mentors and display in dropdown
      await axios.get(`${url}/users/all-mentors`)
      .then((response)=>{
          setUser(response.data.user)
      })
      .catch((error)=>{
          console.log(error);
      })
  }
  const handleEvent =async()=>{// creating student with a mentor or without mentor
     try {
        let response =  await axios.post(`${url}/users/add-student`,{
            studentName:sName,
            studentMentor:mName
        })
        console.log(response)
        if(response.status === 200){
            setRes(response.data.message);
        } 
     } catch (error) {
        console.log(error)
     }
  }

  return <>
   <div className="add-wrapper">
        <h3>Add Student</h3>
            <div className="inputfields">
                <label>Student Name* : </label> <input className="input" type="text" placeholder="Student" required={true} onChange={(e)=>setsName(e.target.value)}></input>
                <label>Mentor Name : </label> 
                <select className="input" onChange={(e)=>setmName(e.target.value)}>
                    <option >
                        Select an Option
                    {console.log(user)}
                    </option>
                        
                    {
                        user.map((e)=>
                         <option value={e.mentorName}>{e.mentorName }</option> 
                    )
                    }
                   
                </select>
            
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={()=>handleEvent()}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
  </>
}

export default Addstudent