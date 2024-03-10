import React, { useRef} from 'react'
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Signin = () => {
  const navigate=useNavigate();
  const email=useRef(null); 
  const password=useRef(null); 


 const sign=()=>{
  signInWithEmailAndPassword(auth,email.current.value,password.current.value).then((user)=>{
  
    navigate('/main');
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode,errorMessage);
  });

 }


  return (
    <div className='justify-center content-center w-screen'>
     <div className="w-64 h-48 bg-blue-400 mt-48  ml-auto mr-auto">
  <h2 className='text-2xl text-center'>Admin</h2>
  <form onSubmit={e=>e.preventDefault()} className='text-center'>
    <input className='border-0 outline-0 mt-2 text-lg text-center' ref={email} onChange={(e)=>(e.target.value)} type="text" title="email" placeholder="email" />
    <input className='border-0 outline-0 mt-2 text-lg text-center' ref={password} onChange={(e)=>(e.target.value)} type="password" title="username" placeholder="password" />
    <button className='text-lg mt-2 border-2 px-5' onClick={sign} type="submit" >Login</button>

  </form>
</div>
    </div>
  )
}

export default Signin