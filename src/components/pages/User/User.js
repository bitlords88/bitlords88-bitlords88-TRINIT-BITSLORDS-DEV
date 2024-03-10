import React, { useEffect, useState } from 'react'
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from 'firebase/firestore'
import {db} from '../../../firebase'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const User = () => {
  const [userList, setUserList] = useState([]);
  const [userName,setUserName]=useState("");
  const [userEmail,setUserEmail]=useState("");
  const [userPassword,setUserPassword]=useState("");
  const userCollection=collection(db,"users");
  const [show,setShow]=useState(false);
  const [editUserId, setEditUserId] = useState(null);

//creating data
const handleClick=async()=>{
  await addDoc(userCollection,{email:userEmail,name:userName,password:userPassword});
  alert("Data Added Successfully");
}
//get data

  useEffect(() => {
    console.log("useffectUser");
    const getUserList = async() => {
      const data=await getDocs(userCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData);
    };
    getUserList();
  },[]);

//handle delete
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (confirmDelete) {
    const deleteVal = doc(db, "users", id);
    await deleteDoc(deleteVal);
  }
};

//handle update
const handleUpdate = async () => {
  const confirmUpdate = window.confirm("Are you sure you want to update this user?");
  if (confirmUpdate) {
    const updateDatabase = doc(db, "users", editUserId);
    await updateDoc(updateDatabase, { name: userName, email: userEmail, password: userPassword });
    setShow(false);
    alert("Data Updated");
  }
};


//handle edit

const handleEdit=async(id,name,email,password)=>{
  setEditUserId(id);
  setUserName(name);
  setUserEmail(email);
  setUserPassword(password);
  setShow(true);
 
  }


  return (
    <div>
      

      <h1 className="text-3xl mt-2 mb-3">Users</h1>
      

      <div className="text-lg flex justify-between rounded-md p-2 bg-[#4f46e5]  text-white">
        <li className="">User_Id</li>
        <li className="">User_Name</li>
        <li className="">User_Mail</li>
        <li className="">
          <>EDIT</>
        </li>
      </div>

      <div className='mt-4 border-2 flex justify-between px-2 text-lg h-10'> 
        <input value={userName} onChange={(e)=>setUserName(e.target.value) } placeholder='name' className='mx-2 outline-0 border-0'></input>
        <input value={userEmail} onChange={(e)=>setUserEmail(e.target.value) }placeholder='email' className='mx-2'></input>
        <input value={userPassword} onChange={(e)=>setUserPassword(e.target.value) } placeholder='password' className='mx-2'></input>
        {!show?<button onClick={handleClick} >Create</button>:
        <button onClick={handleUpdate} >Update</button>}
    </div>
    



      <div>
        {userList.map((prop) => {
          return (
            
            <div className=' flex mt-2 justify-between border-2 rounded-md p-2 ' key={prop.id}>
            <li className=''>{prop.id}</li>
            <li className=''>{prop.name}</li>
            <li className=''>{prop.email}</li>
            <li className='flex'><FaEdit className='mr-2'onClick={()=>handleEdit(prop.id,prop.name,prop.email,prop.password)}/> <MdDelete onClick={()=>handleDelete(prop.id)}/></li>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
