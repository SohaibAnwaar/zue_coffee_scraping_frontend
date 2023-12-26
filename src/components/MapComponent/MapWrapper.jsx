
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Circle, CircleMarker, Marker, Tooltip, Rectangle, useMap } from "react-leaflet";

const Legend = () => {
const map = useMap();
  useEffect(() => {
    if (!map) return;
    const legend = L.control({ position: "bottomright" });

    let rows = [];
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");
      [{color: 'DC3545', label: 'More than 5km away'}, {color: 'FFC107', label: 'Within 5km'} ].map((category, index) => {
        return rows.push(`
            <div className="row" style="background: white; padding: 5px;">
            <div className=" display: flex; flex-direction: row;">
              <div style="background: #${category.color}; width: 15px; height: 15px"></div><div>${category.label}</div
            </div>
            </div>
          `);
      });
      div.innerHTML = rows.join("");
      console.log(div.innerHTML)
      return div;
    };
    map

    legend.addTo(map);
  }, []);

  return null;
};

function customMarkerIcon(color) {
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="marker">
      <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
      <path fill="#${color}" stroke="#fff" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>`;

  return new L.DivIcon({
    className: "test",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  });
}

const MyMarkers = ({ location, color }) => {
  return (
    <Marker
      icon={customMarkerIcon(color)}
      position={{  lat: location.latitude, lng: location.longitude }}
    >
      <Popup>Hello</Popup>
    </Marker>
  )
};
const MapWrapper = () => {
const locations = [
  { latitude: 40.7128, longitude: -74.0060, name: "New York City" },  // Center point
  { latitude: 40.730610, longitude: -73.935242, name: "Brooklyn Bridge" },  // Within 5km
  { latitude: 42.6526, longitude: -73.7562, name: "Albany" },  // More than 5km away
  { latitude: 42.8864, longitude: -78.8784, name: "Buffalo" },  // More than 5km away
  { latitude: 40.70933880547101, longitude: -74.00739290963774 },  // More than 5km away
];



function haversineDistance(point1, point2) {
    const R = 6371; // Earth radius in kilometers
    const dLat = toRad(point2.latitude - point1.latitude);
    const dLon = toRad(point2.longitude - point1.longitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(point1.latitude)) * Math.cos(toRad(point2.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}


const redOptions = { weight: 1, color: 'red', fillOpacity: '0.1',   dashArray: '20, 20', dashOffset: '0' }

  return (
    <div className="w-[50%] h-[70%]">
  <MapContainer whenCreated={(data) => console.log(d)} center={[40.7128, -74.0060]} zoom={13} scrollWheelZoom={false} style={{height: "100%", width: '100%', borderRadius: 5, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
      locations.map((location, index, arr) => (
        arr?.filter((_, innerIndex) => innerIndex !== index).some((item) => haversineDistance(location, item) < 5) ?
(

        <Circle
          key={index}
          center={[location.latitude, location.longitude]}
          radius={5000}
          pathOptions={redOptions}
          >
            <MyMarkers location={location} index={index} color={'DC3545'}/>
          </Circle>
): (

<MyMarkers location={location} index={index} color={'198754'} key={index}/>
)
      ))
    }
    <Legend />
  </MapContainer>
    </div>
  );
};

export default MapWrapper;