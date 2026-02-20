import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

// ✅ Cloudinary config
const CLOUD_NAME = "dob3psxy1";
const UPLOAD_PRESET = "Letskillify";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !desc || !content || !imgFile) {
      alert("Please fill in all fields and select an image");
      return;
    }

    try {
      setLoading(true);

      // ✅ Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", imgFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;

      // ✅ Save blog in Firestore
      await addDoc(collection(db, "blogs"), {
        title,
        desc,
        content,
        img: imageUrl,
        createdAt: new Date(),
      });

      alert("Blog added successfully ✅");
      navigate("/");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to add blog ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "700px" }}>
      <Card className="p-4 shadow-sm">
        <h3 className="fw-bold text-center mb-4">Add New Blog</h3>
        <Form onSubmit={handleSubmit}>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Blog Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter short description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>

          {/* Content */}
          <Form.Group className="mb-3">
            <Form.Label>Full Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Write full blog content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImgFile(e.target.files[0])}
            />
          </Form.Group>

          {/* Submit */}
          <div className="text-center">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Uploading..." : "Add Blog"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default BlogForm;
