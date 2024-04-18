import React, { useState } from 'react';
import Shredpal from '../apis/Shredpal';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const AddReview = () => {
    const { id } = useParams();
    const location = useLocation();
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await Shredpal.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                // rating

            });
            navigate('/')
        } catch (err) { }
    };

    return (
        <div className="container mt-5">
            <h2>Add Review</h2>
            <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        placeholder="Enter your name"
                        type="text"
                        className="form-control"
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        id="rating"
                        className="form-control">
                        <option disabled>Choose a rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div> */}
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        id="review"
                        placeholder="Write your review here..."
                        className="form-control"
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleSubmitReview}
                    className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddReview;
