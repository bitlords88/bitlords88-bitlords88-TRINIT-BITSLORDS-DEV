

import { FaEdit } from "react-icons/fa";
import { get, getDatabase, ref} from "firebase/database";
import { useEffect, useState } from "react";
import { app } from "../../../firebase";
import { MdDelete } from "react-icons/md";
const Donation=()=>{

  const [data, setData] = useState([]);
  // const [userlocation, setLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbref = ref(db, "Fundes");
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
  return (
    <div>
      <h1 className="text-3xl mt-2 mb-3">Donation</h1>
      <div className="text-lg flex justify-between rounded-md p-2 bg-[#4f46e5]  text-white">
        {/* <li className="">User_Id</li> */}
        <li className="">Title</li>
        <li className="">Received Amount</li>
        <li className="">
          Total mount
        </li>
        <li>Edit</li>
      </div>

      <div>
        {data.map((prop) => {
          
          return (
            <div key={prop.id} className=' flex mt-2 justify-between border-2 rounded-md p-2'>
             {/* <li className=''>{prop.id}</li> */}
             <li className=''>{prop.title}</li>
             <li className=''>{prop.revAmo}</li>
             <li className=''>{prop.totAmo}</li>
             <li className='flex'><FaEdit className='mr-2'/> <MdDelete/></li>
           </div>
     )
        
        })}
      </div>
    </div>
  );
    }

export default Donation;
