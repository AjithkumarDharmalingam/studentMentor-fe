import React from 'react'
import { url } from '../App'
import { useState,useEffect } from "react";
import axios from "axios";

function Allstudents() {
  let [user,setUser]=useState([]);
    useEffect(()=>{
        getAllData();//to get all students data
    },[])
    let getAllData = async()=>{
        try {
            let response = await axios.get(`${url}/users/all-students`)
            if(response.status === 200){
            setUser(response.data.user)
        }
        } catch (error) {
            console.log(error)
        }
    }
    return<>
        <div>
        <h3>Student Details</h3>
            <table className="table table-hover table-bordered border-primary">
                <thead className="table" id="thead">
                    <tr>
                        <th>Student Name</th>
                        <th>Mentor Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((e)=>{
                            return <>
                                <tr>
                                    <td>{e.studentName}</td>
                                    <td>{e.studentMentor}</td>
                                    
                                </tr>
                            </>
                        })
                    }
                </tbody> 
            </table>
        </div>
    </>
}


export default Allstudents