import React from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { BiLogOut, BiSolidDonateHeart } from "react-icons/bi";
import { CgCommunity } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const Navbar= () =>{

    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
        }).catch((error) => {
        console.log(error);
        });
    }

  return (
  <div className='text-2xl p-2 h-screen cursor-pointer  bg-[#4f46e5] text-white'> 
    <li className='text-3xl flex px-2 items-center  mb-3'>
     
    <RiAdminFill className='mx-2'/>Admin
   
    </li>
    
    <li className=' px-2 mt-5 rounded-md hover:bg-blue-200 '>
    <Link to="/main/user" className='flex items-center'><FaCircleUser className='mx-2'/> Users</Link>
    
    </li>
    <li className='mt-5 flex px-2 items-center rounded-md hover:bg-blue-200'>
   
    <Link className='flex items-center' to="/main/officials"> <FaUserGroup className='mx-2' /> Officials</Link>
    
    </li>
    <li className='mt-5 flex px-2 items-center rounded-md hover:bg-blue-200'>
    <Link className='flex items-center' to="/main/donations"> <BiSolidDonateHeart className='mx-2' /> Donations</Link>
    
    </li>
    <li className='mt-5 flex px-2  items-center rounded-md hover:bg-blue-200'>
      <Link  to='/main/community' className='flex items-center'>
    <CgCommunity  className='mx-2'/> Community
    </Link>
    </li>   
    <li className='mt-5 flex px-2  items-center rounded-md hover:bg-blue-200'>
      <Link  onClick={handleLogout} className='flex items-center'>
    <BiLogOut  className='mx-2'/> Logout
    </Link>
    </li>   
  </div>
  );
}
export default Navbar;