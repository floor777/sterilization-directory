import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";

import './map.css'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
import axios from "axios";


export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() { 
  const getMarkers = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3000/marker/all"
    }).then((response) => {
      console.log(response);
      const markers = response.data
      setMarkers(response.data);
      console.log(markers);
      return response.data
      
    });
  };
    
    const [selected, setSelected] = useState(null);

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
      getMarkers();
    }, []);

    useEffect(() => {
      if (selected) {
        setCenter(selected);
      }
    }, [selected]);

    // console.log(markers);
 
    const [center, setCenter] = useState(() => ({ lat: 34.1008, lng: -117.7678 }), []);
    
    
  return (
    <>

    <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
    </div>

    <GoogleMap 
    zoom={12} 
    center={center} 
    mapContainerClassName="map-container" 
    >
      
        {selected && <MarkerF position={selected} visible={true}   /> 


        }
        

        {markers.map(marker => (
        <MarkerF
          key={marker.id}
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
          title={markers.length}
          onClick={() => {console.log(marker)}}
        />

      ))}
        
    </GoogleMap>
    <button onClick={() => {console.log('julia')}}></button>
    <button onClick={() => {console.log('guo')}}></button>
    
    </>
  );
  
}

const PlacesAutocomplete = ({ setSelected }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    };
  
    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  };