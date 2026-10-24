import React from 'react';
import './CustomerReview.css';

const CustomerReview = () => {
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            review: "Absolutely stunning work! The team transformed my living room into a modern masterpiece. Their attention to detail and creative vision exceeded all expectations.",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            review: "Professional, creative, and efficient. They understood my vision perfectly and brought it to life. Highly recommend their services!",
            rating: 5
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            review: "The interior design exceeded my wildest dreams. Every corner of my home now feels luxurious and personalized. Worth every penny!",
            rating: 5
        },
        {
            id: 4,
            name: "David Thompson",
            review: "From concept to completion, the experience was seamless. Their innovative designs and quality craftsmanship are unmatched.",
            rating: 5
        },
        {
            id: 5,
            name: "Priya Sharma",
            review: "Amazing transformation! They took my ideas and elevated them to a whole new level. The space feels both elegant and comfortable.",
            rating: 5
        },
        {
            id: 6,
            name: "James Wilson",
            review: "Outstanding service and creativity. They created a perfect balance between aesthetics and functionality. Couldn't be happier!",
            rating: 5
        }
    ];

    return (
        <section className="customer-review-section" id="reviews">
            <div className="review-container">
                <div className="review-header">
                    <h2 className="review-title">What Our Clients Say</h2>
                    <p className="review-subtitle">Discover why homeowners trust us with their dream spaces</p>
                </div>

                <div className="review-cards-wrapper">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className="review-card"
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <div className="review-content">
                                <div className="review-stars">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <span key={i} className="star">★</span>
                                    ))}
                                </div>
                                <p className="review-text">"{review.review}"</p>
                                <div className="reviewer-info">
                                    <div className="reviewer-avatar">
                                        {review.name.charAt(0)}
                                    </div>
                                    <h4 className="reviewer-name">{review.name}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerReview;
