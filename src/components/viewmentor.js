import {useState,useEffect} from "react";
import axios from "axios";
import { url } from '../App';

function Viewmentor() {
  let [mName,setmName]=useState("");
  let [students,setStudents]=useState([]);
  let [user,setUser]=useState([]);
  let count = 0;
  useEffect(()=>{
      getAllMentors();
  },[])
  const getAllMentors = async()=>{//collecting all mentors details
      await axios.get(`${url}/users/all-mentors`)
      .then((response)=>{
        setUser(response.data.user);
      })
      .catch((error)=>{
          console.log(error);
      })
  }
  const handleEvent = async()=>{// to get the student details of particular mentor
    const selectedMentor = user.find((e) => e.mentorName === mName )
    console.log(selectedMentor)
    setStudents(selectedMentor.mentorStudents)
    
  }
  return <>
      <div className="add-wrapper">
      <h3>View Mentor Students</h3>
          <div className="inputfields">
          <label>Mentor Name : </label>
              <select className="input" onChange={(e)=>{setmName(e.target.value)}}>
              <option>
                        Select an Option
                    </option>
                    {
                        user.map((e)=>
                              <option key={e._id}>{e.mentorName}</option>
                         )
                    }
                    {console.log(user)}
              </select>
          </div>
          <br></br>
          <button className="btn btn-primary" id="but" onClick={handleEvent}>View</button>
          <h3> Students Mapped to Mentor {mName} are:</h3>
          {   
              students.map((e)=>{
                  count=count+1;// to give s.no for each students
                  return <h4>{count}.{e}</h4>
              })
          }
      </div>
  </>
  
}

export default Viewmentor