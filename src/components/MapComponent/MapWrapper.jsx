
import { useEffect} from "react";
import { MapContainer, TileLayer, Popup, Circle, CircleMarker, Marker, Tooltip, Rectangle, useMap } from "react-leaflet";
import {useGetOutlets} from "../../hooks";

const Legend = () => {
const map = useMap();
  useEffect(() => {
    if (!map) return;
    const legend = L.control({ position: "bottomright" });
    let rows = [];
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");
      [{color: '5cb85c', label: 'More than 5km away'}, {color: 'd9534f', label: 'Within 5km'} ].map((category, index) => {
        return rows.push(`
            <div className="row" style="background: white; padding: 5px;">
            <div className=" display: flex; flex-direction: row;">
              <div style="background: #${category.color}; width: 15px; height: 15px"></div><div>${category.label}</div
            </div>
            </div>
          `);
      });
      div.innerHTML = rows.join("");
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
      <Popup>
        <div><b>Name: </b>{location.name}</div>
        <div><b>Address: </b> {location.address}</div>
      </Popup>
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
const {data, isLoading} = useGetOutlets();

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
if (isLoading) return (<div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>);

  return (
    <div className="w-[50%] h-[70%]">
      {
        data ? ( 
  <MapContainer whenCreated={(data) => console.log(d)} center={[data[0]?.latitude, data[0]?.longitude]} zoom={13} scrollWheelZoom={false} style={{height: "100%", width: '100%', borderRadius: 5, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
      data?.map((location, index, arr) => (
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
) : (
  <h1 className="text-center text-xl font-semibold text-blue-600/100 dark:text-blue-500/100">Nothing Found!</h1>
)
      }
    </div>
  );
};

export default MapWrapper;