import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Editor } from "@tinymce/tinymce-react";

const CLOUD_NAME = "dob3psxy1";
const UPLOAD_PRESET = "Letskillify";

function slugify(str) {
  return str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywordsText, setKeywordsText] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [currentImg, setCurrentImg] = useState("");
  const [currentSlug, setCurrentSlug] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, "blogs", id));
        if (snap.exists()) {
          const d = snap.data();
          setTitle(d.title || "");
          setDesc(d.desc || "");
          setContent(d.content || "");
          setMetaTitle(d.metaTitle || "");
          setMetaDescription(d.metaDescription || "");
          setKeywordsText(Array.isArray(d.keywords) ? d.keywords.join(", ") : "");
          setCurrentImg(d.img || "");
          setCurrentSlug(d.slug || "");
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = currentImg;
      if (imgFile) {
        const formData = new FormData();
        formData.append("file", imgFile);
        formData.append("upload_preset", UPLOAD_PRESET);
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        imageUrl = data.secure_url;
      }
      const keywords = keywordsText
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0);
      const nextSlug = currentSlug || `${slugify(title)}-${Math.random().toString(36).slice(2, 6)}`;
      await updateDoc(doc(db, "blogs", id), {
        title,
        desc,
        content,
        metaTitle,
        metaDescription,
        keywords,
        slug: nextSlug,
        img: imageUrl,
      });
      alert("Blog updated");
      navigate("/admin/blogs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <h3 className="fw-bold mb-3">Edit Blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Blog Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <input type="text" className="form-control" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Full Content</label>
          <div className="border rounded">
            <Editor value={content} onEditorChange={(v) => setContent(v)} init={{ height: 400, menubar: false }} />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Meta Title</label>
          <input type="text" className="form-control" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Meta Description</label>
          <textarea className="form-control" rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Keywords</label>
          <input type="text" className="form-control" placeholder="Comma-separated" value={keywordsText} onChange={(e) => setKeywordsText(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Current Image</label>
          {currentImg ? <img src={currentImg} alt="current" style={{ maxWidth: "100%", borderRadius: 6 }} /> : <div className="text-muted">No image</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Replace Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={(e) => setImgFile(e.target.files[0])} />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/admin/blogs")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
