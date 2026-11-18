
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import { auth, db } from "../firebase";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let unsubscribeEnquiries;
    let unsubscribeFeedback;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user || user.uid !== "I4Rqr3bLMAfOdELZnk9LdGdAPfp1") {
        navigate("/admin");
        return;
      }

      unsubscribeEnquiries = onSnapshot(
        collection(db, "enquiries"),
        (snapshot) => {
          const data = snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data()
          }));

          data.sort((a, b) =>
            (b.createdAt?.toMillis?.() || 0) -
            (a.createdAt?.toMillis?.() || 0)
          );

          setEnquiries(data);
          setLoading(false);
        },
        (error) => {
          console.error("Enquiries error:", error);
          setStatus("Could not load enquiries.");
          setLoading(false);
        }
      );

      unsubscribeFeedback = onSnapshot(
        collection(db, "feedback"),
        (snapshot) => {
          const data = snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data()
          }));

          data.sort((a, b) =>
            (b.createdAt?.toMillis?.() || 0) -
            (a.createdAt?.toMillis?.() || 0)
          );

          setFeedback(data);
        },
        (error) => {
          console.error("Feedback error:", error);
          setStatus("Could not load feedback.");
        }
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeEnquiries) unsubscribeEnquiries();
      if (unsubscribeFeedback) unsubscribeFeedback();
    };
  }, [navigate]);

  async function handleApprove(id) {
    try {
      await updateDoc(doc(db, "feedback", id), {
        approved: true
      });

      setStatus("Feedback approved successfully!");
    } catch (error) {
      console.error(error);
      setStatus("Could not approve feedback.");
    }
  }

  async function handleReject(id) {
    const confirmReject = window.confirm(
      "Are you sure you want to reject and delete this feedback?"
    );

    if (!confirmReject) return;

    try {
      await deleteDoc(doc(db, "feedback", id));
      setStatus("Feedback rejected successfully.");
    } catch (error) {
      console.error(error);
      setStatus("Could not reject feedback.");
    }
  }

  async function handleLogout() {
    await signOut(auth);
    navigate("/admin");
  }

  function formatDate(timestamp) {
    if (!timestamp?.toDate) return "Date unavailable";

    return timestamp.toDate().toLocaleString("en-IN");
  }

  const pendingFeedback = feedback.filter(
    (item) => item.approved === false
  );

  const approvedFeedback = feedback.filter(
    (item) => item.approved === true
  );

  if (loading) {
    return <div className="admin-loading">Loading Dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Dehati Thiya Apna Dhaba</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {status && <p className="admin-status">{status}</p>}

      <div className="admin-stats">

        <div className="stat-card">
          <h3>Total Enquiries</h3>
          <h2>{enquiries.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Feedback</h3>
          <h2>{feedback.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Pending Feedback</h3>
          <h2>{pendingFeedback.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Approved Feedback</h3>
          <h2>{approvedFeedback.length}</h2>
        </div>

      </div>

      {/* Customer Enquiries */}

      <section className="admin-section">
        <h2>Customer Enquiries</h2>

        {enquiries.length === 0 ? (
          <p className="empty-message">No enquiries received yet.</p>
        ) : (
          <div className="admin-list">
            {enquiries.map((item) => (
              <div className="admin-item" key={item.id}>
                <h3>{item.name}</h3>

                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Phone:</strong> {item.phone}</p>
                <p><strong>Rating:</strong> {"★".repeat(item.rating || 0)}</p>
                <p><strong>Message:</strong> {item.message}</p>
                <small>{formatDate(item.createdAt)}</small>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pending Feedback */}

      <section className="admin-section">
        <h2>Pending Feedback</h2>

        {pendingFeedback.length === 0 ? (
          <p className="empty-message">No pending feedback.</p>
        ) : (
          <div className="admin-list">
            {pendingFeedback.map((item) => (
              <div className="admin-item" key={item.id}>
                <h3>{item.name}</h3>

                <div className="admin-stars">
                  {"★".repeat(item.rating || 0)}
                  {"☆".repeat(5 - (item.rating || 0))}
                </div>

                <p>{item.message}</p>
                <small>{formatDate(item.createdAt)}</small>

                <div className="feedback-actions">
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(item.id)}
                  >
                    Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => handleReject(item.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Approved Feedback */}

      <section className="admin-section">
        <h2>Approved Feedback</h2>

        {approvedFeedback.length === 0 ? (
          <p className="empty-message">No approved feedback yet.</p>
        ) : (
          <div className="admin-list">
            {approvedFeedback.map((item) => (
              <div className="admin-item" key={item.id}>
                <h3>{item.name}</h3>

                <div className="admin-stars">
                  {"★".repeat(item.rating || 0)}
                  {"☆".repeat(5 - (item.rating || 0))}
                </div>

                <p>{item.message}</p>
                <small>{formatDate(item.createdAt)}</small>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default AdminDashboard;
