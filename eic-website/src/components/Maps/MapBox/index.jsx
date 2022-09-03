import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Control } from 'mapbox-gl';
import './Map.css';
import { selectMapObject } from 'src/store/States/Buffer/'
import { useSelector } from 'react-redux'
import MarkerTypes, { getMarkerColor } from 'src/constants/Map/markerTypes'

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [zoom, setZoom] = useState(11.5);
  const [markers, setMarkers] = useState([])
  const [markerTypes, setMarkerTypes] = useState([])
  const [initialCenter, setInitialCenter] = useState({ latitude: 9.01500852350414, longitude: 38.78373476856234 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [originAddress, setOriginAddress] = useState({})
  const [destinationAddress, setDestinationAddress] = useState({})

  const locationData = useSelector(selectMapObject)

  useEffect(() => {
    if (Object.keys(locationData).length === 2) {
      setMarkers([locationData.origin_address, locationData.destination_address])
      setMarkerTypes([MarkerTypes.ORIGIN, MarkerTypes.DESTINATION])
    } else if (Object.keys(locationData).length === 3) {
      if (locationData.resting_places.length > 0) {
        const newMarkers = [locationData.origin_address, locationData.destination_address]
        const newMarkerTypes = [MarkerTypes.ORIGIN, MarkerTypes.DESTINATION]
        const newPlaces = []
        locationData.resting_places.forEach(place => {
          newMarkers.push(place)
          newMarkerTypes.push(MarkerTypes.DEFAULT)
        })
        setMarkers([...newMarkers, ...newPlaces])
        setMarkerTypes(newMarkerTypes)
      } else {
        setMarkers([locationData.origin_address, locationData.destination_address])
        setMarkerTypes([MarkerTypes.ORIGIN, MarkerTypes.DESTINATION])
      }
    }
    setInitialCenter(locationData.origin_address)
    setOriginAddress(locationData.origin_address)
    setDestinationAddress(locationData.destination_address)

  }, [locationData, setMarkers, setInitialCenter])

  useEffect(() => {
    if (markers.length >= 2 && Object.keys(initialCenter).length === 2) {
      setIsLoaded(true)
    }
  }, [initialCenter, markers, setIsLoaded])

  useEffect(() => {
    if (!isLoaded) return;
    const mapObject = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [initialCenter.longitude, initialCenter.latitude],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    mapObject.addControl(new mapboxgl.NavigationControl(), 'top-right');

    mapObject.on('move', () => {
      const longitude = mapObject.getCenter().lng.toFixed(4)
      const latitude = mapObject.getCenter().lat.toFixed(4);
      setInitialCenter({ latitude, longitude })
      setZoom(mapObject.getZoom().toFixed(2));
    });

    const foundMarkers = markers.map((marker, idx) => {
      return new mapboxgl.Marker({ color: getMarkerColor(markerTypes[idx]) })
        .setLngLat([marker.longitude, marker.latitude])
    })
    foundMarkers.map(marker => marker.addTo(mapObject))
    mapObject.on('load', () => {
      const coordinate_values = []
      // if (locationData.resting_places.length > 0) {
      //   locationData.resting_places.forEach(place => coordinate_values.push([place.longitude, place.latitude]))
      // }
      if (locationData.travel_history) {
        locationData.travel_history.forEach(place => coordinate_values.push([place.longitude, place.latitude]))
      }
      var geojson = {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [originAddress.longitude, originAddress.latitude],
                ...coordinate_values,
                [destinationAddress.longitude, destinationAddress.latitude]
              ]
            },
            "properties": {
              "title": 'Work Route', // this is a field we can reference in the addLayer with '{title}',
              "marker-color": "blue",
              "marker-size": "large",
              "marker-symbol": "rocket"
            },
          }],
        }
      }
      mapObject.addSource("route", geojson)
      mapObject.addLayer({
        "id": "route",
        "type": "line",
        "source": "route",
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "lightgreen",
          "line-width": 8
        }
      })
    })

    return () => mapObject.remove();
  }, [isLoaded, setIsLoaded, setInitialCenter, initialCenter, originAddress, destinationAddress]); // eslint-disable-line react-hooks/exhaustive-deps

  return initialCenter ? (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {initialCenter.longitude} | Latitude: {initialCenter.latitude} | Zoom: {zoom}
        </div>
      </div>
      {isLoaded && <div className='map-container' ref={mapContainerRef} />}
    </div>
  ) : <></>;
};

export default Map;