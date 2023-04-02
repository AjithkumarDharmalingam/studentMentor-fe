import React from 'react'
import {useState,useEffect} from "react";
import axios from "axios";
import Select from "react-select";
import { url } from '../App';

function Assignstudents() {
  let [sNames,setsNames]=useState("");
    let [mName,setmName]=useState("");
    let [user,setUser]=useState([]);
    let [res,setRes]=useState("");
    let [options,setOptions]=useState([]);
    useEffect(()=>{
        getAllMentors();
        getAllStudents();
    },[])
    const getAllMentors = async()=>{//get all mentors
        await axios.get(`${url}/users/all-mentors`)
        .then((response)=>{
            setUser(response.data.user)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const getAllStudents = async()=>{//get all students
        await axios.get(`${url}/users/all-students`)
        .then((response)=>{
          console.log(response);
            response.data.user.map((e)=>{
                if(e.studentMentor == ""){
                    options.push({//initialise options for multi select dropdown
                                value:options.length+1,
                                label:e.studentName
                            })
                   // return console.log(e)
                }
               
            })
        })
        console.log(options)
        .catch((error)=>{
            console.log(error);
        })
    }
    const handleEvent =async()=>{//assigning students for selected mentor
        await axios.post(`${url}/users/assign-students`,{
            mentorName:mName,
            mentorStudents:sNames
        })
        .then((response)=>{
            setRes(response.data.message);
            setTimeout(() => {// to refresh after successfull changes
                window.location.reload();
              }, 1000);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    let UpdateSelected = (e)=>{
        setsNames(Array.isArray(e)?e.map(x=>x.label):[]);//to handle multi select dropdown selected data
   }
  return <>
    <div className="add-wrapper">
        <h3>Assign Students</h3>
            <div className="inputfields">
                <label>Mentor Name : </label>
                <select className="input" onChange={(e)=>setmName(e.target.value)}>
                    <option >
                        Select an Option
                    </option>
                    {
                        user.map((e)=>
                              <option key={e._id}>{e.mentorName}</option>
                         )
                    }
                </select>
                <label>Students : </label>
                <Select isMulti options={options} className="input" displayValue="Student" onChange={UpdateSelected}/>
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
  </>
}

export default Assignstudents