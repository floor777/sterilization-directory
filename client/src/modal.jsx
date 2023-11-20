import React, { useState } from "react";
import "./modal.css";
import axios from "axios"; 

const Modal = ({reviewId, setReviews, getReviewsByMarkerId}) => {
  const [modal, setModal] = useState(false);
  const [sex, setSex] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [type, setType] = useState("");
  const [reviewText, setReviewText] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  const getReviewById = async (reviewId) => {
    try {
        let response = await axios({
            method: "get",
            params: {
              reviewId: reviewId
            },
            withCredentials: true,
            url: "https://sterilizationdirectoryserver.azurewebsites.net/review/findareview"
          })
          
          return response.data.review;
        
    } 
    catch (error) {
        console.log(error);
    }
  }

  const editReview = async (reviewId) => {
    const selectedReview = await getReviewById(reviewId);
    try {
      let response = await axios({
        method: "put",
        params: {
          sex: sex,
          maritalStatus: maritalStatus,
          type: type,
          reviewText: reviewText,
          reviewId: reviewId,   
        },
        withCredentials: true,
        url: "https://sterilizationdirectoryserver.azurewebsites.net/review/update"
      })
      //
    
      
      let refreshedReviews = await getReviewsByMarkerId(selectedReview.markerId);
      await setReviews(refreshedReviews);
      toggleModal();
      return response.data.id;
      
    } 
    catch (error) {
        console.log(error)
    }
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Edit
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Edit Review</h2>
            <div id="inputs">
            <input placeholder='Sex' onChange={e => setSex(e.target.value)}></input>
            <input placeholder='Marital status' onChange={e => setMaritalStatus(e.target.value)}></input>
            <input placeholder='Type' onChange={e => setType(e.target.value)}></input>
            <input placeholder='Review text' onChange={e => setReviewText(e.target.value)}></input>

            </div>
            
            {/* <button onClick={() => {getReviewById(reviewId)}}> get review id</button> */}
            <button onClick={() => {editReview(reviewId)}}> submit changes</button>
            <button className="close-modal" onClick={toggleModal}>
               X
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}
export default Modal;