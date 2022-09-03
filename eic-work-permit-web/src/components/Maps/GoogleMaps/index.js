import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import constants from 'src/constants/config'
import { selectMapObject } from 'src/store/States/Buffer/'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import LocationIcon from '@mui/icons-material/RemoveDoneOutlined'

const mapStyles = {
  width: '70%',
  height: '70%',
  left: -472,
  top: 20,
  zIndex: 3
};

const MapContainer = ({ ...props }) => {
  const [markers, setMarkers] = useState([{ lat: 47.49855629475769, lng: -122.14184416996333 },
  { latitude: 47.359423, longitude: -122.021071 },
  { latitude: 47.2052192687988, longitude: -121.988426208496 },
  { latitude: 47.6307081, longitude: -122.1434325 },
  { latitude: 47.3084488, longitude: -122.2140121 },
  { latitude: 47.5524695, longitude: -122.0425407 }])
  const [initialCenter, setInitialCenter] = useState({ lat: 9.01500852350414, lng: 38.78373476856234 })

  const locationData = useSelector(selectMapObject)

  useEffect(() => {
    if (Object.keys(locationData).length === 2) {
      setMarkers([locationData.origin_address, locationData.destination_address])
      setInitialCenter(locationData.origin_address)
    }

  }, [locationData])

  const displayMarkers = () => {
    return markers.map((marker, index) => {
      return <Marker
        key={index}
        id={index}
        position={{
          lat: marker.latitude,
          lng: marker.longitude
        }}
        onClick={() => console.log("You clicked me!")}
      >
        <LocationIcon />
      </Marker>
    })
  }

  return Object.keys(locationData).length === 2 && (
    <Map
      google={props.google}
      zoom={8}
      style={mapStyles}
      initialCenter={initialCenter}
    >
      {displayMarkers()}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: constants.GOOGLE_CLOUD_API_KEY
})(MapContainer);
