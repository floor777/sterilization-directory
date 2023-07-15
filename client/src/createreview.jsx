import './createreview.css'
import React, { useState } from "react";
import axios from "axios";

const CreateReview = ({ getUser, currentId, setReviews, getReviewsByMarkerId }) => {

  const [sex, setSex] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [type, setType] = useState("");
  const [reviewText, setReviewText] = useState("");


  const createReview =  async () => {
    const authorizedUser = await getUser();

    axios({
      method: "post",
      data: {
        sex: sex,
        maritalStatus: maritalStatus,
        type: type,
        reviewText: reviewText,
        userId: authorizedUser ,
        markerId: currentId

      },
      withCredentials: true,
      url: "http://localhost:3000/review/create"
    })
    .then(async () => {

      setReviews(await getReviewsByMarkerId(currentId));
      
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
        Create review
      </button>

    </>
  );
};

export default CreateReview;