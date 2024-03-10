import React, { useEffect, useState } from "react";

import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

import { Official } from "./Official";

//login
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isLogin, setLogin] = useState(false);

  const [userList, setMovieList] = useState([]);

  // connecting to database collection name govtoficial
  const userCollectionref = collection(db, "govtOfficial");

  //fetching from the collection
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getDocs(userCollectionref);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log(data);
        console.log(filteredData[0]);

        setMovieList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  //handling the login

  const handleLogin = async () => {
    let matchedUser = null;

    const userWithMatchingUserId = userList.find(
      (user) => user.userId === userId
    );

    if (userWithMatchingUserId) {
      alert("User found with matching userId");
      matchedUser = userWithMatchingUserId;

      if (matchedUser.email === email && matchedUser.password === password) {
        setLogin(true);
      } else {
        alert("Invalid email or password");

        setEmail("");
        setPassword("");
        setLogin(false);
      }
    } else {
      alert("User not found");
      setLogin(false);
      setUserId("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="loginParent">
      
      {!isLogin ? (
       
       <div className='justify-center content-center w-screen'>
     <div className="w-64 h-48 bg-blue-400 mt-48  ml-auto mr-auto">
  <h2 className='text-2xl text-center'>Govt Login</h2>
  <form onSubmit={e=>e.preventDefault()} className='text-center'>
  <input className='border-0 outline-0 mt-2 text-lg text-center'    onChange={(e) => setUserId(e.target.value)} type="text" placeholder="username" />
    <input className='border-0 outline-0 mt-2 text-lg text-center'   onChange={(e) => setEmail(e.target.value)} type="text" title="email" placeholder="email" />
    <input className='border-0 outline-0 mt-2 text-lg text-center' onChange={(e) => setPassword(e.target.value)} type="password" title="username" placeholder="password" />
    <button className='text-lg mt-2 border-2 px-5'onClick={handleLogin}>Sign in</button>

  </form>
</div>
    </div>
      ) : (
        <Official />
      )}
    </div>
   
  );
};

export default Login;
