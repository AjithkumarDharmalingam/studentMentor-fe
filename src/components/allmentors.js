import {useState,useEffect} from "react";
import axios from "axios";
import { url } from "../App";


function Allmentors() {

  let [user,setUser]=useState([]);
    useEffect(()=>{
        getAlldata();
    },[])
    let getAlldata = async()=>{// to get all mentor data
        try {
            let response = await axios.get(`${url}/users/all-mentors`)
            console.log(response)
            if(response.status === 200){
                setUser(response.data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }   


  return <>
   <div>
        <h3>Mentor Details</h3>
            <table className="table table-hover table-bordered border-primary">
                <thead className="table" id="thead">
                    <tr>
                        <th>Mentor Name</th>
                        <th>Student Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((e)=>{
                            return <>
                                <tr>
                                    <td>{e.mentorName}</td>
                                    <td>  
                                        {`${e.mentorStudents},`}
                                    </td>
                                </tr>
                            </>
                        })
                    }
                </tbody>
            </table>
        </div>
  </>
}

export default Allmentors