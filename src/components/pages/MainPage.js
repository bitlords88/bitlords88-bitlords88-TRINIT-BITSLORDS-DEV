import React from 'react'
import Navbar from '../pages/Navbar'
import User from './User/User'
import { Route, Routes} from 'react-router-dom'
import Official from '../pages/Officials/Official'
import Donation from './Donations/Donation'
import Community from './Community/Community'


const MainPage = () => {
  return (
    
    <div className='flex'>
        <div className='w-2/12 '>
        <Navbar />
        </div>
        
        <div className='w-10/12 px-4'>
        <Routes>
        <Route path="/user" element={<User/>} ></Route>
        <Route path="/officials" element={<Official />} ></Route>
        <Route path="/donations" element={<Donation />} ></Route>
        <Route path="/community" element={<Community />} ></Route>
       
      </Routes>
        </div>
       
    </div>
  )
}

export default MainPage;