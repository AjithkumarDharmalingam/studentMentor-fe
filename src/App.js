import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Addmentor from './components/addmentor';
import Addstudent from './components/addstudent';
import Allmentors from './components/allmentors';
import Allstudents from './components/allstudents';
import Assignstudents from './components/assignstudents';
import Changementor from './components/changementor';
import Topbar from './components/topbar';
import Viewmentor from './components/viewmentor';
export const url = 'https://studentmentor-vuj7.onrender.com'

function App() {
  return <>
  <BrowserRouter>
  <Topbar/>
    <Routes>
    
       <Route path='/home' element={<Home/>}/>
       <Route path='/add-mentor' element={<Addmentor/>}/>
       <Route path='/add-student' element={<Addstudent/>}/>
       <Route path='/all-mentor' element={<Allmentors/>}/>
       <Route path='/all-student' element={<Allstudents/>}/>
       <Route path='/assign-students' element={<Assignstudents/>}/>
       <Route path='/change-mentor' element={<Changementor/>}/>
       <Route path='/topbar' element={<Topbar/>}/>
       <Route path='/view-mentor' element={<Viewmentor/>}/>
    </Routes>
  </BrowserRouter>
  </>
}

export default App;
