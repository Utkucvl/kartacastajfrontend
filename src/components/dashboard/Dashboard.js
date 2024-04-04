import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEarthquakes } from "../../store/earthquakeSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const earthquakes = useSelector((state) => state.earthquake.earthquakes); // Tüm deprem verilerini alıyoruz
  const [startDate, setStartDate] = useState("2024-03-01");
  const [finishDate, setFinishDate] = useState("2024-03-29");
  const [magnitude, setMagnitude] = useState(5);

  useEffect(() => {
    dispatch(
      getEarthquakes({
        startDate: startDate,
        finishDate: finishDate,
        magnitude: magnitude,
      })
    );
  }, [dispatch, startDate, finishDate, magnitude]);

  useEffect(() => {
    if (earthquakes.length > 0) {
      initMap();
    }
  }, [earthquakes]);

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    });

    earthquakes.forEach((earthquake) => {
      const marker = new window.google.maps.Marker({
        position: { lat: earthquake.latitude, lng: earthquake.longitude },
        map,
        title: `Magnitude: ${earthquake.magnitude}`,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `Magnitude: ${earthquake.magnitude}`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  };


  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <label htmlFor="startDate" style={{marginRight:"10px"}}>Start Date:</label>
        <input
          type="date"
          id="startDate"
          style={{marginBottom:"20px" , marginTop:"5px"}}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="finishDate" style={{marginRight:"10px"}}>Finish Date:</label>
        <input
          type="date"
          style={{marginBottom:"20px"}}
          id="finishDate"
          value={finishDate}
          onChange={(e) => setFinishDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="magnitude" style={{marginRight:"10px"}}>Magnitude:</label>
        <input
          type="number"
          id="magnitude"
          style={{marginBottom:"20px"}}
          value={magnitude}
          onChange={(e) => setMagnitude(e.target.value)}
        />
      </div>
      <div id="map" style={{ height: "600px", width: "100%" }}></div>
    </div>
  );
};

export default Dashboard;
