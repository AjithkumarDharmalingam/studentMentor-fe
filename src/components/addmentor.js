import {useState,useEffect} from 'react'
import axios from 'axios'
import Select from "react-select";
import {url} from '../App'


function Addmentor() {

    let [mName,setmName]=useState("");
    let [sNames,setsNames]=useState([]);
    let [res,setRes]=useState("");
    let [options]=useState([]);
    useEffect(()=>{
        getAllStudents()
    },[])
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
    const handleEvent =async()=>{// creating mentor with array of students
       try {
        let res =  await axios.post(`${url}/users/add-mentor`,{
          mentorName:mName,
          mentorStudents:sNames
      })
      if(res.status === 200){
        setRes(res.data.message)
      }
       } catch (error) {
        console.log(error)
       }
        
        
    }
    
  let UpdateSelected = (e)=>{
      setsNames(Array.isArray(e)?e.map(x=>x.label):[]);// to handle selected students in multi dropdown
  }

  return <>
    <div className="add-wrapper">
        <h3>Add Mentor</h3>
            <div className="inputfields">
                <label>Mentor Name* : </label> <input className="input" type="text" placeholder="Student" required={true} onChange={(e)=>setmName(e.target.value)}></input>
                <label>Student Name : </label> 
                <Select isMulti options={options} className="input" displayValue="Student" onChange={UpdateSelected}/>
            
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
  </>
}

export default Addmentor