import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./modal.jsx";

const Review = ({ review, getUser, setReviews, reviews, getReviewsByMarkerId }) => {

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios({
        method: "delete",
        params: {
          reviewId: reviewId
        },
        withCredentials: true,
        url: "http://localhost:3000/review/delete"
      })
      await setReviews(reviews.filter((review) => review.reviewId !== reviewId));

      return response.data.id;
    } 
    catch (error) {
      console.log(error);
      
    }
    
  };

    const [authenticatedUserId, setAuthenticatedUserId] = useState(null);

    useEffect(() => {
      const fetchAuthenticatedUserId = async () => {
        const userId = await getUser();

        setAuthenticatedUserId(userId);
      };
  
      fetchAuthenticatedUserId();

    }, [authenticatedUserId]);

    


    return (
      <div>
        <h3>Review ID: {review.reviewId}</h3>
        <div id="love">
          <p>Sex: {review.sex}</p>
          <p>Marital status: {review.maritalStatus}</p>
          <p>type: {review.type}</p>
          <p>User id: {review.userId}</p>
          

        </div>
        <p>Text: {review.reviewText}</p>

        {review.userId === authenticatedUserId && (
        <div>
          <Modal
          reviewId={review.reviewId}
          setReviews={setReviews}
          getReviewsByMarkerId={getReviewsByMarkerId}
          >
           </Modal>

          <button onClick={() => {deleteReview(review.reviewId)}}>Delete</button>
        </div>
      )}
  
      </div>
    );
  };

  export default Review;