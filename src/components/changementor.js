import {useState,useEffect} from "react";
import axios from "axios";
import { url } from '../App';
import Select from "react-select";

function Changementor() {
//   let [allMentors,setAllMentors]=useState([]);
//   let [allStudents,setAllStudents]=useState([]);
  let [mName,setmName]=useState("");
  let [sName,setsName]=useState("");
  let [res,setRes]=useState("");
  let [options]=useState([]);
  let [user,setUser]=useState([]);
  useEffect(()=>{
      getAllMentors();//get all mentor details
      getAllStudents();//get all students details
  },[])
  const getAllMentors = async()=>{
      await axios.get(`${url}/users/all-mentors`)
      .then((response)=>{
        setUser(response.data.user);
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
            if(e.studentMentor !== ""){
                options.push({//initialise options for multi select dropdown
                            value:options.length+1,
                            label:e.studentName
                        })
            }
           
        })
    })
    console.log(options)
    .catch((error)=>{
        console.log(error);
    })
}

  const handleEvent =async()=>{
      let oldMentor=""//to get the old mentor of the selected student. 
      user.map(async(e)=>{
          if(e.studentName===sName)
              oldMentor=(e.studentMentor)
      })
      await axios.post(`${url}/users/change-mentor`,{
          mentorName:mName,
          studentName:sName,
          oldMentor:oldMentor,
      })//to modify the mentor
      .then((response)=>{
          setRes(response.data.message);
          setTimeout(() => {//to refresh the page after successfull modifications
              window.location.reload();
            }, 1000);
      })
      .catch((error)=>{
          console.log(error);
      })
  }
  let UpdateSelected = (e)=>{
    setsName(Array.isArray(e)?e.map(x=>x.label):[]);//to handle multi select dropdown selected data
}
  return <>
     <div className="add-wrapper">
            <h3>Change Mentor</h3>
            <div className="inputfields">
                <label>Student Name : </label>
                <Select isMulti options={options} className="input" displayValue="Student" onChange={UpdateSelected}/>
                <label>New Mentor : </label>
                <select className="input" onChange={(e)=>setmName(e.target.value)}>
                    <option>
                        Select an Option
                    </option>
                    {
                        user.map((e)=>
                              <option key={e._id}>{e.mentorName}</option>
                         )
                    }
                </select>
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
  </>
}

export default Changementor