import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Spinner,
  Row,
  Col,
  Badge,
  Form,
} from "react-bootstrap";
import { db } from "../../firebase"; // ✅ adjust path
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// 🔹 Helper function for "time ago"
const timeAgo = (timestamp) => {
  if (!timestamp?.toDate) return "Just now";
  const now = new Date();
  const diff = Math.floor((now - timestamp.toDate()) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Comments state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch single blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // ✅ Fetch comments in real-time
  useEffect(() => {
    if (!id) return;

    const commentsRef = collection(db, "blogs", id, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [id]);

  // ✅ Handle new comment submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.text.trim()) return;

    setSubmitting(true);
    try {
      const commentsRef = collection(db, "blogs", id, "comments");
      await addDoc(commentsRef, {
        name: newComment.name,
        text: newComment.text,
        createdAt: serverTimestamp(),
      });
      setNewComment({ name: "", text: "" }); // clear form
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (!blog) {
    return <h2 className="text-center mt-5 text-danger">Blog Not Found</h2>;
  }

  return (
    <>
      {/* Banner */}
      <div
        style={{
          height: "350px",
          backgroundImage: `url(${blog.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <Container className="my-5">
        <Row className="g-4">
          {/* LEFT COLUMN → Blog content */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm p-4">
              <Card.Body>
                <h1 className="fw-bold mb-3">{blog.title}</h1>
                <div className="d-flex flex-wrap gap-3 mb-4 text-muted">
                  {blog.category && <Badge bg="info">{blog.category}</Badge>}
                  {blog.author && <span>✍️ {blog.author}</span>}
                  {blog.date && <span>📅 {blog.date}</span>}
                  {blog.readTime && <span>⏱️ {blog.readTime} min read</span>}
                </div>

                <Card.Text
                  className="fs-5"
                  style={{ lineHeight: "1.8", color: "#444" }}
                >
                  {blog.content}
                </Card.Text>

                {/* Back Button */}
                <div className="mt-4">
                  <Link to="/blogs">
                    <Button variant="secondary">← Back to Blogs</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>

            {/* Comment Form */}
            <Card className="shadow-sm mt-4 p-md-4">
              <h5 className="fw-bold mb-3">Leave a Comment</h5>
              <Form onSubmit={handleCommentSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    value={newComment.name}
                    onChange={(e) =>
                      setNewComment({ ...newComment, name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write your comment..."
                    value={newComment.text}
                    onChange={(e) =>
                      setNewComment({ ...newComment, text: e.target.value })
                    }
                  />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={submitting}>
                  {submitting ? "Posting..." : "Post Comment"}
                </Button>
              </Form>
            </Card>
          </Col>

          {/* RIGHT COLUMN → Interactive Comments List */}
          <Col lg={4}>
            <Card className="shadow-sm p-3 h-100">
              <h5 className="fw-bold mb-3">💬 Reader Comments</h5>

              <div
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  paddingRight: "8px",
                }}
              >
                {comments.length === 0 ? (
                  <p className="text-muted">No comments yet. Be the first!</p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="d-flex align-items-start mb-3 p-2 rounded bg-light"
                    >
                      {/* Avatar (Initials) */}
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                        style={{ width: "40px", height: "40px", fontSize: "0.9rem" }}
                      >
                        {c.name?.charAt(0).toUpperCase() || "U"}
                      </div>

                      {/* Comment Content */}
                      <div className="flex-grow-1">
                        <strong>{c.name}</strong>{" "}
                        <small className="text-muted ms-1">
                          {timeAgo(c.createdAt)}
                        </small>
                        <p className="mb-1"style={{ fontSize: "0.95rem" }}>{c.text}</p>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2">
                          <Button size="sm" variant="outline-primary">
                            👍 Like
                          </Button>
                          <Button size="sm" variant="outline-secondary">
                            ↩ Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogDetail;
