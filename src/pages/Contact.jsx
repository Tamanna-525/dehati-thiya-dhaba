
import { useState, useEffect } from "react";
import "./Contact.css";

import { db } from "../firebase";

import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  writeBatch,
  serverTimestamp
} from "firebase/firestore";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [reviews, setReviews] = useState([]);

  // Fetch approved feedback from Firebase
  useEffect(() => {
    const feedbackQuery = query(
      collection(db, "feedback"),
      where("approved", "==", true)
    );

    const unsubscribe = onSnapshot(
      feedbackQuery,
      (snapshot) => {
        const reviewList = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }));

        reviewList.sort((a, b) => {
          const timeA = a.createdAt?.toMillis?.() || 0;
          const timeB = b.createdAt?.toMillis?.() || 0;
          return timeB - timeA;
        });

        setReviews(reviewList);
      },
      (error) => {
        console.error("Feedback loading error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Submit contact form
  async function handleSubmit(e) {
    e.preventDefault();

    if (rating === 0) {
      setStatus("Please select a star rating.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const batch = writeBatch(db);

      // Save enquiry
      const enquiryRef = doc(collection(db, "enquiries"));

      batch.set(enquiryRef, {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        rating,
        createdAt: serverTimestamp()
      });

      // Save feedback separately
      if (feedback.trim()) {
        const feedbackRef = doc(collection(db, "feedback"));

        batch.set(feedbackRef, {
          name: name.trim(),
          rating,
          message: feedback.trim(),
          createdAt: serverTimestamp(),
          approved: false
        });
      }

      await batch.commit();

      setStatus("Thank you! Your message has been submitted successfully.");

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setRating(0);
      setFeedback("");

    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("Sorry! Your message could not be submitted. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="contact-page">

      <div className="contact-heading">
        <h1>Contact Us</h1>
        <p>We would love to welcome you at our Dhaba!</p>
      </div>

      <div className="contact-container">

        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="info-box">
            <h3>Our Location</h3>
            <p>Near Nehru Nagar, Piperchhedi, Durg, Chhattisgarh</p>
          </div>

          <div className="info-box">
            <h3>Opening Hours</h3>
            <p>Open 24 Hours - Every Day</p>
          </div>

          <div className="info-box">
            <h3>Phone Number</h3>
            <p>Contact number will be updated soon.</p>
          </div>

          <div className="info-box">
            <h3>Our Services</h3>
            <p>Dine-in | Takeaway | Drive-through</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="tel"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <div className="rating-section">
              <h3>Rate Your Experience</h3>

              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={star <= rating ? "active-star" : ""}
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <p>
                {rating === 0
                  ? "Select your rating"
                  : `You selected ${rating} out of 5 stars`}
              </p>
            </div>

            <textarea
              placeholder="Write your feedback (optional)"
              rows="3"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Send Message"}
            </button>

            {status && (
              <p className="form-status" role="status">
                {status}
              </p>
            )}

          </form>
        </div>

      </div>

      <div className="customer-reviews">
        <h2>Customer Feedback</h2>
        <p className="review-subtitle">
          What our customers say about us
        </p>

        {reviews.length === 0 ? (
          <p className="no-reviews">
            No approved feedback yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="reviews-container">
            {reviews.map((review) => (
              <div className="review-card" key={review.id}>
                <h3>{review.name}</h3>

                <div className="review-stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

                <p>{review.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Contact;
