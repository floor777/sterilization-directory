import { useState } from "react";
import axios from "axios";

const NewMarkerAndReview = ({ setCurrentId, getMarkers, getUser, 
  setReviews, getReviewsByMarkerId, latitude, longitude, address }) => {

  const [sex, setSex] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [type, setType] = useState("");
  const [reviewText, setReviewText] = useState("");

  const buildMarker = async () => {
    let lat = latitude;
    let lng = longitude;

    lat = Number(lat).toFixed(6);
    lng = Number(lng).toFixed(6);

    try {
      let response = await axios({
        method: "post",
        params: {
          lat: lat,
          lng: lng,
          title: address[0].formatted_address
        },
        withCredentials: true,
        url: "http://localhost:3000/marker/build"
      })

      return response.data.marker
    } 
    catch (error) {
      console.log(error);
    }
  }


  const createReview =  async () => {
    const authorizedUser = await getUser();
    const marker = await buildMarker();
    const reviews = await getReviewsByMarkerId(marker.id);

    axios({
      method: "post",
      data: {
        sex: sex,
        maritalStatus: maritalStatus,
        type: type,
        reviewText: reviewText,
        userId: authorizedUser ,
        markerId: marker.id

      },
      withCredentials: true,
      url: "http://localhost:3000/review/create"
    })
    .then(async () => {
      setCurrentId(marker.id);
      setReviews(reviews);
      getMarkers();
    });
  };

  return (
    <>
    <div id="create-review-div">
   
        <input className='input-bars' placeholder='Sex' onChange={e => setSex(e.target.value)}></input>
        <input className='input-bars' placeholder='Marital status' onChange={e => setMaritalStatus(e.target.value)}></input>
        <input className='input-bars' placeholder='Type' onChange={e => setType(e.target.value)}></input>
        <input className='input-bars' placeholder='Review text' onChange={e => setReviewText(e.target.value)}></input>
    </div>
      <button onClick={() => {createReview()}}>
        Create Marker and Accompanying review
      </button>
    </>
  );
};

export default NewMarkerAndReview;