import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  // Fetch blogs from Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  // Framer motion variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="position-relative overflow-hidden">
      {/* 🔹 SVG Animated Background */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 400"
        className="position-absolute top-0 start-0 w-100 h-100 z-n1"
        preserveAspectRatio="none"
      >
        {/* Blob 1 */}
        <motion.circle
          cx="150"
          cy="200"
          r="120"
          fill="rgba(33,150,243,0.08)"
          animate={{ cx: [140, 180, 140], cy: [180, 220, 180] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        />
        {/* Blob 2 */}
        <motion.circle
          cx="650"
          cy="150"
          r="100"
          fill="rgba(76,175,80,0.1)"
          animate={{ cx: [640, 680, 640], cy: [140, 180, 140] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: "mirror" }}
        />
        {/* Wavy Path */}
        <motion.path
          d="M0,300 Q400,100 800,300 T1600,300"
          fill="none"
          stroke="rgba(156,39,176,0.15)"
          strokeWidth="80"
          animate={{
            d: [
              "M0,300 Q400,100 800,300 T1600,300",
              "M0,320 Q400,120 800,280 T1600,320",
              "M0,300 Q400,100 800,300 T1600,300",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
        />
      </motion.svg>

      <Container className="my-5 position-relative">
        <h2 className="text-center mb-4 fw-bold">Latest Blogs</h2>
        {blogs.length === 0 ? (
          <p className="text-center">No blogs found.</p>
        ) : (
          <>
            <Row className="g-4">
              {currentBlogs.map((blog, idx) => (
                <Col key={blog.id} md={4} sm={6} xs={12}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    variants={cardVariants}
                  >
                    <Card
                      className="h-100 shadow-sm blog-card"
                      style={{
                        transition: "transform 0.3s, box-shadow 0.3s",
                        cursor: "pointer",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={blog.img}
                        alt={blog.title}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          transition: "transform 0.3s",
                        }}
                      />
                      <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Card.Text>{blog.desc}</Card.Text>
                        <Link to={`/blog/${blog.id}`}>
                          <Button variant="primary">Read More</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
                {[...Array(totalPages)].map((_, idx) => (
                  <Pagination.Item
                    key={idx + 1}
                    active={idx + 1 === currentPage}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </Pagination>
            </div>
          </>
        )}

        {/* Hover effect CSS */}
        <style>
          {`
            .blog-card:hover {
              transform: translateY(-8px) scale(1.03);
              box-shadow: 0 20px 30px rgba(0,0,0,0.2) !important;
            }
          `}
        </style>
      </Container>
    </div>
  );
};

export default Blogs;
