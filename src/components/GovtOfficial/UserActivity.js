import React, { useEffect, useState } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import { app } from "./config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

import "./UserActivity.css";

const UserActivity = () => {
  const [data, setData] = useState([]);
  // const [userlocation, setLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbref = ref(db, "Reports");
        const dbref2 = ref(db, "Userlocation");
        const snapshot = await get(dbref);
        const snapshot2 = await get(dbref2);

        if (snapshot.exists()) {
          const myData = snapshot.val();
          const tempArray = Object.keys(myData).map((id) => {
            return {
              ...myData[id],
              docId: id,
            };
          });

          setData(tempArray);
        }
        // if (snapshot2.exists()) {
        //   setLocation(Object.values(snapshot2.val()));
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteFruit = async (fruitIdParam) => {
    const db = getDatabase(app);
    const docRef = doc(db, "Reports", fruitIdParam);
    await deleteDoc(docRef);
  };
  return (
    <>
      <div className="userActivity">
        <table>
          <thead>
            <tr>
              <th>Area</th>
              <th>Type</th>
              <th>Postal Code</th>
              <th>About</th>
              <th>verify</th>
              <th>Delete</th>

              {/* Add more fields as needed */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.area}</td>
                <td>{item.type}</td>
                <td>{item.postCode}</td>
                <td>{item.about}</td>
                <td>
                  {" "}
                  <input type="checkbox" />{" "}
                </td>
                <td>
                  {" "}
                  <button onClick={() => deleteFruit(item.postCode)}>
                    Delete
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserActivity;