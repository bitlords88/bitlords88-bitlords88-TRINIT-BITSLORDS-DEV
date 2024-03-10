

import { FaEdit } from "react-icons/fa";
import { get, getDatabase, ref, remove} from "firebase/database";
import { useEffect, useState } from "react";
import { app, db } from "../../../firebase";
import { MdDelete } from "react-icons/md";
const Community=()=>{

  const [data, setData] = useState([]);
  // const [userlocation, setLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbref = ref(db, "Reports");
        const snapshot = await get(dbref);
     
        if (snapshot.exists()) {
          setData(Object.values(snapshot.val()));
        }
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
   
  //handle deleete

  const handleDelete = (prop) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      remove(ref(db, `Reports/${prop.uuid}`));
    }
  };
  
  

  return (
    <div>
      <h1 className="text-3xl mt-2 mb-3">Community</h1>
      <div className="text-lg flex justify-between rounded-md p-2 bg-[#4f46e5]  text-white">
        <li className="">Type</li>
        <li className="">Postcode</li>
        <li className="">Area</li>
        <li className="">About</li>
        <li>Edit</li>
      </div>

      <div>
        {data.map((prop) => {
          
          return (
            <div key={prop.id} className=' flex mt-2 justify-between border-2 rounded-md p-2'>
             <li className=''>{prop.type}</li>
             <li className=''>{prop.postCode}</li>
             <li className=''>{prop.area}</li>
             <li className=''>{prop.about}</li>
             <li className='flex'><FaEdit className='mr-2'/> <MdDelete onClick={handleDelete}/></li>
           </div>
     )
        
        })}
      </div>
    </div>
  );
    }

export default Community;




// <div className='flex justify-around p-4 text-center'>
//         <div className='border-2 h-56 w-1/3 mx-2 pt-12'>
//             <h1 className='text-3xl '>
//                 Posts
//             </h1>
//            <div className='flex cursor-pointer mt-2 justify-center text-lg'>
//            <li className='mr-4 hover:text-xl'>
//                 User Posts
//             </li>
//             <li className='mr-4 hover:text-xl'>
//                 Admin Posts
//             </li>
//             <li className='mr-4 hover:text-xl'>
//                 Officers Post
//             </li>
//            </div>
//         </div>

//         <div className='border-2 h-56 w-1/3 mx-2 pt-12'>
//         <h1 className='text-3xl mt-2'>
//                 Report
//             </h1>
//            <div className='flex cursor-pointer mt-2 justify-center text-lg'>
//            <li className='mr-4 hover:text-xl'>
//                 User Report
//             </li>
//             <li className='mr-4 hover:text-xl'>
//                 Officer Report
//             </li>
//            </div>
//         </div>

//         <div className='border-2 h-56 w-1/3 mx-2 pt-12 '>
//         <h1 className='text-3xl mt-2'>
//                Request
//             </h1>
//            <div className='flex cursor-pointer mt-2 justify-center  text-lg'>
//            <li className='mr-4 hover:text-xl'>
//                 Crowdfunding Request
//             </li>
//            </div>
//         </div>
//         </div>

       
