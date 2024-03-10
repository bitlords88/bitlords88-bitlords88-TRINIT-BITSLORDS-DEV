import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "../../firebase";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const Notification = () => {
  //use-state hook
  const [disastertype, setDisasterType] = useState("");
  const [code, setCode] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading state

  // Handling the form submission
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while database operation is in progress

    const db = getDatabase(app);
    const newDocRef = push(ref(db, "Satark/alert"));

    try {
      await set(newDocRef, {
        alertMessage: alertMessage,
        disaster_type: disastertype,
        area: code,
        longitude: lon,
        latitude: lat,
      });
      // Reset form fields after successful submission
      setDisasterType("");
      setCode("");
      setAlertMessage("");
      setLon("");
      setLat("");
      setLoading(false); // Set loading state back to false after successful submission
      alert("Alert sent successfully!"); // Show success message
    } catch (error) {
      console.error("Error sending alert:", error);
      alert("Error sending alert. Please try again!"); // Show error message
      setLoading(false); // Set loading state back to false after error
    }
  };

  const [markerPosition, setMarkerPosition] = useState([48.8566, 2.3522]);

  const customIcon = new Icon({
    iconUrl: require("./image/icon.png"),
    iconSize: [38, 38],
  });

  // Custom event handler to update marker position
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);

        setLat(e.latlng.lat);
        setLon(e.latlng.lng);
      },
    });
  };

  return (
    <>
      <div className="p-5 border-2 m-3">
        <h1>Sent Alert</h1>
        <form>
          <div className="map">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={13}
              style={{ height: "300px" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <MapClickHandler />
              <Marker position={markerPosition} icon={customIcon}>
                <Popup>
                  Latitude: {markerPosition[0]}
                  <br />
                  Longitude: {markerPosition[1]}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <label className="mt-2">Notification title </label> <br />
          <input className="mt-2"
            type="text"
            placeholder="Notification title"
            value={alertMessage}
            onChange={(e) => setAlertMessage(e.target.value)}
          />
          <br/>
          <br />
          <label className="mt-2">Type of disaster</label>
          <br />
          <select className="mt-2"
            value={disastertype}
            onChange={(e) => setDisasterType(e.target.value)}>
            <option>Select disaster</option>
            <option>Earth-Quake</option>
            <option>Hurricane</option>
            <option>Tsunami</option>
          </select>
          <br />
          <br/>
          <label className="mt-2" >Area Code </label>
          <br />
          <select value={code} onChange={(e) => setCode(e.target.value)}>
            <option>Area1</option>
            <option>Area2</option>
          </select>
          <br />
          <br/>
          <label className="mt-2">Latitude: </label>
          <p>{lat}</p>
          <br />
          <label className="mt-2">Longitude: </label>
          <p>{lon}</p>
          <br />
          <button  className=" border-2 px-2" onClick={handleClick} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Notification;
