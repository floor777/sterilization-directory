import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";
import Review from "./review.jsx";
import Modal from "./modal.jsx";
import CreateReview from "./createreview.jsx";
import NewMarkerAndReview from "./newMarkerAndReview.jsx";

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

  const [currentId, setCurrentId] = useState(0);
  const [markerExists, setMarkerExists] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState("");
  const [hasSearched, sethasSearched] = useState(false);

  const getUser = async () => {
    const response = await axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3000/auth/currentuser"
    })
    return response.data;

  };

  const getMarkers = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3000/marker/all"
    })
    .then((response) => {
      const markers = response.data
      setMarkers(markers);
      return response.data
      
    });
  };

  const getAllReviews = async () => {

    try {
      let response = await axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:3000/review/all"
      })
      const reviews = response.data
      return reviews;
      
    } 
    catch (error) {
      console.log(error);
      
    }

  };

  const getReviewsByMarkerId = async () => {
    try {
      let response = await axios({
        method: "get",
        params: {
          markerId: currentId
        },
        withCredentials: true,
        url: "http://localhost:3000/review/getReviewsByMarkerId"
      });

      return response.data;
      
    } 
    catch (error) {
      console.log(error);
      
    }

  }

    const [selected, setSelected] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      if(currentId) {

      async function setReviewsForId() {
        let test = await getReviewsByMarkerId();
        setReviews(test);
      }

      setReviewsForId();

      }
      
    }, [currentId]);

    // useEffect(() => {
    //   if(reviews.length > 0) {
    //     console.log('reviews useEffect');
    //     console.log(reviews);
    //   }
      
    // }, [reviews])
    useEffect(() => {
      getMarkers();
    }, []);

    useEffect(() => {
      if (selected) {
        setCenter(selected);
      }
    }, [selected]);
 
    const [center, setCenter] = useState(() => ({ lat: 34.1008, lng: -117.7678 }), []);
    
  return (
    <>
    <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} getReviewsByMarkerId={getReviewsByMarkerId} 
        setCurrentId={setCurrentId} currentId={currentId} setReviews={setReviews} reviews={reviews}
        getAllReviews={getAllReviews} getUser={getUser} setMarkerExists={setMarkerExists} markerExists={markerExists}
        latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude}
        setAddress={setAddress} sethasSearched={sethasSearched} hasSearched={hasSearched} />
    </div>

    <GoogleMap 
    zoom={12} 
    center={center} 
    mapContainerClassName="map-container" 
    >
      {selected && <MarkerF position={selected} visible={true} icon={'https://cdn.discordapp.com/attachments/1104912164294246451/1123515848267661363/map-pin.png'}  /> 
      }
      
      {markers.map(marker => (
      
        <MarkerF
          key={marker.id}
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
          title={marker.title}
          onClick={() => {setCurrentId(marker.id)}}
        />

      ))};
     
    </GoogleMap>

    <button onClick={() => {getAllReviews()}}>Get all reviews</button>

    {(currentId !== 0 && reviews.length >= 0) && 
    <CreateReview
    getUser={getUser}
    currentId={currentId}
    setReviews={setReviews}
    getReviewsByMarkerId={getReviewsByMarkerId}
    key={"review"}
    >
    </CreateReview>

    }
    {(reviews.length > 0) && reviews.map(review => (
      
      <Review
      getUser={getUser}  
      key={review.id} 
      review={review}
      setReviews={setReviews}
      reviews={reviews}
      getReviewsByMarkerId={getReviewsByMarkerId}
 
      />
      
      ))
    }

    {((reviews.length == 0 && currentId == 0 && hasSearched)  && 


    <NewMarkerAndReview
    getUser={getUser}
    currentId={currentId}
    setReviews={setReviews}
    getReviewsByMarkerId={getReviewsByMarkerId}
    latitude={latitude}
    longitude={longitude}
    address={address}
    getMarkers={getMarkers}
    setCurrentId={setCurrentId}
    

    >

    </NewMarkerAndReview>

    
    )}


    </>
  );
  
}

const PlacesAutocomplete = ({ markerExists, setSelected,
   setCurrentId, setReviews, reviews, setMarkerExists
   , latitude, longitude, setLatitude, setLongitude, setAddress, sethasSearched, hasSearched }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();

    

     const getMarkerId = async (lat, lng) => {
      try {
        const response = await axios({
          method: "get",
          params: {
            lat: lat,
            lng: lng
          },
          withCredentials: true,
          url: "http://localhost:3000/marker/exists"
        });

        if (response.config.method === "get" && response.data.message === "Marker at this lat/lng already exists") {
          return response.data.marker.id;
        } 
        else {
          console.log('Non-200 response recorded in map.jsx');
        }
      } 
      catch (error) {
        console.log( error);
      }
     }

    const checkIfMarkerExists = async (lat, lng) => {
    
      try {
        const response = await axios({
          method: "get",
          params: {
            lat: lat,
            lng: lng
          },
          withCredentials: true,
          url: "http://localhost:3000/marker/exists"
        });
    
        if (response.config.method === "get" && response.data.message === "Marker at this lat/lng does not exist yet") {
          console.log('Marker does not exist');
          return false;
        } else if (response.config.method === "get" && response.data.message === "Marker at this lat/lng already exists") {
          console.log('Marker already exists');
          // console.log(response.data)
          return true;
        } else {
          console.log('Non-200 response recorded in map.jsx');
          return false;
        }
      } catch (err) {
        console.log('Error in map.jsx:', err);
      }
    };
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      const results = await getGeocode({ address });
      setAddress(results);
      
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });

      if(await checkIfMarkerExists(lat, lng)) {
        await setLatitude(lat);
        await setLongitude(lng);
        await setMarkerExists(true);
        setCurrentId(await getMarkerId(lat,lng));
      }

      else {
        await setCurrentId(0);
        await setReviews([]);
        await setMarkerExists(false);
      }
      setLatitude(lat);
      setLongitude(lng);
      sethasSearched(true);
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
        <ComboboxPopover id="combobox-popover">
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