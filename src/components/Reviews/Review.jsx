import { useContext, useState } from "react";
import { MainContext } from "../Cart/MainProvider";
// import { useContext } from 'react';
// import { MainContext } from '../Cart/MainProvider';
import users from "./Reviews.json";
import Breadcrumbs from "../Breadcums";
import { motion, AnimatePresence } from "framer-motion";

function Review() {
  // const { Getreview } = useContext(MainContext);
  const [selectedRating, setSelectedRating] = useState("");
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [replyStates, setReplyStates] = useState({});
  // const [helpfulCounts, setHelpfulCounts] = useState({});
  const [replyTexts, setReplyTexts] = useState({});

  const handleRatingHover = (rating) => {
    setHoveredRating(rating);
  };

  const handleReplyClick = (reviewId) => {
    setReplyStates((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  // const handleHelpfulClick = (reviewId) => {
  //   setHelpfulCounts((prev) => ({
  //     ...prev,
  //     [reviewId]: (prev[reviewId] || 0) + 1,
  //   }));
  // };

  const handleShareClick = () => {
      alert("Share button is not working,We are working on it");
  };

  const handleReportClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to report this review?"
    );
    if (confirmed) {
      alert("Review has been reported. Our team will look into it.");
    }
  };

  const handleReplySubmit = (reviewId) => {
    if (replyTexts[reviewId]?.trim()) {
      alert("Reply submitted successfully!");
      setReplyTexts((prev) => ({
        ...prev,
        [reviewId]: "",
      }));
      setReplyStates((prev) => ({
        ...prev,
        [reviewId]: false,
      }));
    }
  };

  const handleReplyTextChange = (reviewId, text) => {
    setReplyTexts((prev) => ({
      ...prev,
      [reviewId]: text,
    }));
  };

  return (
    <>
      <Breadcrumbs />
      <section className="pt-lg-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto d-block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card border shadow-lg rounded-4 overflow-hidden"
              >
                <div className="card-header bg-primary bg-opacity-10 border-bottom">
                  <div className="row justify-content-between align-middle">
                    <div className="col-sm-6">
                      <h3 className="card-header-title mb-2 mb-sm-0 text-primary">
                        <i className="fas fa-star me-2"></i>
                        Letskillify Student Reviews
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="card-body mt-2 mt-sm-4">
                  <AnimatePresence>
                    {users?.map((r, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.1 }}
                        className="review-card mb-4 rounded-3 hover-shadow-lg transition-all"
                        style={{
                          borderBottom: "1px solid #dde0e3",
                          backgroundColor: "#fff",
                          transition: "all 0.3s ease",
                        }}
                        key={i}
                      >
                        <div className="d-sm-flex">
                          <div className="me-4" style={{ width: "100px" }}>
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              className="rounded-circle border border-3 border-white shadow-sm"
                              src={`${r?.img}`}
                              alt={r?.name}
                              onError={(e) => {
                                e.target.src = "/assets/images/default.jpeg";
                              }}
                              style={{
                                maxWidth: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <div className="mb-3 d-sm-flex justify-content-sm-between align-items-center">
                              <div>
                                <h5 className="mb-1 text-primary">{r?.name}</h5>
                              </div>

                              <div className="rating-stars d-flex align-items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <i
                                    key={star}
                                    className={`fas fa-star fs-5 me-1 ${
                                      star <= r?.rating
                                        ? "text-warning"
                                        : "text-muted"
                                    }`}
                                  ></i>
                                ))}
                                <span className="ms-2 badge bg-warning">
                                  {r?.rating}.0
                                </span>
                              </div>
                            </div>
                            <div className="review-content">
                              <h6 className="mb-2 text-dark">{r?.comments}</h6>
                              <p className="mb-3">{r.disc}</p>

                              <div className="d-flex justify-content-between align-items-center">
                                <div className="helpful-buttons">
                                  <button
                                    className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() => console.log('Helpful clicked')}
                                  >
                                    <i className="far fa-thumbs-up me-1"></i>
                                    Helpful{" "}
                                    {/* {helpfulCounts[i]
                                      ? `(${helpfulCounts[i]})`
                                      : ""} */}
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleReportClick()}
                                  >
                                    <i className="far fa-flag me-1"></i> Report
                                  </button>
                                </div>

                                <div className="action-buttons">
                                  <button
                                    className={`btn btn-sm ${
                                      replyStates[i]
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                    } me-2`}
                                    onClick={() => handleReplyClick(i)}
                                  >
                                    <i className="fas fa-comment me-1"></i>{" "}
                                    Reply
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleShareClick()}
                                  >
                                    <i className="fas fa-share me-1"></i> Share
                                  </button>
                                </div>
                              </div>

                              {/* Replay Button Popup */}
                              {replyStates[i] && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3"
                                >
                                  <div className="d-flex gap-2">
                                    <textarea
                                      className="form-control"
                                      placeholder="Write your reply..."
                                      rows="2"
                                      value={replyTexts[i] || ""}
                                      onChange={(e) =>
                                        handleReplyTextChange(i, e.target.value)
                                      }
                                    ></textarea>
                                    <button
                                      className="btn btn-primary px-4"
                                      onClick={() => handleReplySubmit(i)}
                                      disabled={!replyTexts[i]?.trim()}
                                    >
                                      <i className="fas fa-paper-plane"></i>
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Add Review Sectionx */}
                <div className="card-footer border-top bg-light p-4">
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="position-relative">
                        <textarea
                          className="form-control bg-white"
                          placeholder="Write your review..."
                          //   rows="1.5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <div className="rating-input position-absolute top-0 end-0 mt-2 me-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <i
                              key={rating}
                              className={`fas fa-star fs-5 me-1 cursor-pointer ${
                                rating <= hoveredRating
                                  ? "text-warning"
                                  : "text-muted"
                              }`}
                              onMouseEnter={() => handleRatingHover(rating)}
                              onMouseLeave={() => handleRatingHover(0)}
                              onClick={() => setSelectedRating(rating)}
                            ></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <select
                        className="form-select form-select-lg py-3"
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(e.target.value)}
                      >
                        <option value="">Filter by Rating</option>
                        <option value="5">★★★★★ (5/5)</option>
                        <option value="4">★★★★☆ (4/5)</option>
                        <option value="3">★★★☆☆ (3/5)</option>
                        <option value="2">★★☆☆☆ (2/5)</option>
                        <option value="1">★☆☆☆☆ (1/5)</option>
                      </select>
                    </div>
                    <div className="col-sm-2">
                      <button className="btn btn-primary w-100 mt-1 py-3">
                        <i className="fas fa-paper-plane me-2"></i>
                        Submit
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <p className="mb-0 text-muted">
                      Showing 1 to 8 of 20 reviews
                    </p>

                    <nav aria-label="Page navigation">
                      <ul className="pagination pagination-sm mb-0">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="fas fa-angle-double-left"></i>
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="fas fa-angle-double-right"></i>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Review;
