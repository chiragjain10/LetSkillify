import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { Editor } from "@tinymce/tinymce-react";

// ✅ Cloudinary config
const CLOUD_NAME = "dob3psxy1";
const UPLOAD_PRESET = "Letskillify";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywordsText, setKeywordsText] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("");

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (scheduleEnabled && (!publishDate || !publishTime)) {
      alert("Please select schedule date and time");
      return;
    }

    // Validate SEO fields
    if (!metaTitle || !metaDescription || !keywordsText) {
      alert("Please fill in all SEO fields");
      return;
    }

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

      const slugBase = slugify(title);
      const unique = Math.random().toString(36).slice(2, 6);
      const slug = `${slugBase}-${unique}`;
      const keywords = keywordsText
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      let publishAtTs = serverTimestamp();
      let status = "published";
      if (scheduleEnabled) {
        const dt = new Date(`${publishDate}T${publishTime}:00`);
        publishAtTs = Timestamp.fromDate(dt);
        status = "scheduled";
      }

      // ✅ Save blog in Firestore
      await addDoc(collection(db, "blogs"), {
        title,
        desc,
        content,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || desc,
        keywords,
        slug,
        img: imageUrl,
        createdAt: serverTimestamp(),
        publishAt: publishAtTs,
        status,
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
            <div className="border rounded">
              <Editor
                apiKey='fyliq0cjbctqb3mtuka0gznhq60oqj2j9seqkjtee5evz7fo'
                value={content}
                onEditorChange={(newValue) => setContent(newValue)}
                init={{
                  height: 400,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic underline | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | link image table | removeformat",
                  mobile: {
                    menubar: false,
                    toolbar:
                      "undo redo | bold italic | bullist numlist | link",
                  },
                  content_style:
                    "body { font-family: Heebo, Roboto, Arial, sans-serif; font-size: 16px }",
                }}
              />
            </div>
          </Form.Group>

          {/* SEO Meta Title */}
          <Form.Group className="mb-3">
            <Form.Label>Meta Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="SEO title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
          </Form.Group>

          {/* SEO Meta Description */}
          <Form.Group className="mb-3">
            <Form.Label>Meta Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="SEO description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
          </Form.Group>

          {/* Keywords (comma-separated) */}
          <Form.Group className="mb-3">
            <Form.Label>Keywords</Form.Label>
            <Form.Control
              type="text"
              placeholder="Comma-separated keywords"
              value={keywordsText}
              onChange={(e) => setKeywordsText(e.target.value)}
            />
            <div className="form-text">Example: full stack, web development, react</div>
          </Form.Group>

          {/* Schedule a Post */}
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="schedule-switch"
              label="Schedule this post"
              checked={scheduleEnabled}
              onChange={(e) => setScheduleEnabled(e.target.checked)}
            />
          </Form.Group>
          {scheduleEnabled && (
            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <Form.Label>Schedule Date</Form.Label>
                <Form.Control
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Schedule Time</Form.Label>
                <Form.Control
                  type="time"
                  value={publishTime}
                  onChange={(e) => setPublishTime(e.target.value)}
                />
              </div>
            </div>
          )}

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
