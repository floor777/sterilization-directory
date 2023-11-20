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
        url: import.meta.env.VITE_SERVER_URL + "/review/delete"
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

        <div id="reviews">
          <p>Sex: {review.sex}</p>
          <p>Marital status: {review.maritalStatus}</p>
          <p>type: {review.type}</p>

          

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