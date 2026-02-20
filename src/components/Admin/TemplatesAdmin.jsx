import React, { useEffect, useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./CourseAdmin.css";

export default function TemplatesAdmin() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: "",
    url: "",
    price: "",
    rating: "",
    lastUpdated: "",
    views: ""
  });
  const [fileThumb, setFileThumb] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "templates"));
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setForm({
      title: "", category: "", description: "", thumbnail: "",
      url: "", price: "", rating: "", lastUpdated: "", views: ""
    });
    setEditing(null);
    setShowForm(true);
    setFileThumb(null);
  };

  const openEdit = (item) => {
    setForm({
      title: item.title || "",
      category: item.category || "",
      description: item.description || "",
      thumbnail: item.thumbnail || item.imgurl || "",
      url: item.url || item.previewUrl || "",
      price: item.price || "",
      rating: item.rating || item.review || "",
      lastUpdated: item.lastUpdated || "",
      views: item.views || ""
    });
    setEditing(item);
    setShowForm(true);
    setFileThumb(null);
  };

  const uploadToCloudinary = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "Letskillify");
    const res = await fetch("https://api.cloudinary.com/v1_1/dob3psxy1/image/upload", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    return data.secure_url;
  };

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload = { ...form };
      if (fileThumb) {
        setUploading(true);
        payload.thumbnail = await uploadToCloudinary(fileThumb);
        setUploading(false);
      }
      if (editing) {
        await updateDoc(doc(db, "templates", editing.id), payload);
      } else {
        await addDoc(collection(db, "templates"), payload);
      }
      setShowForm(false);
      setFileThumb(null);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this template?")) return;
    await deleteDoc(doc(db, "templates", id));
    await load();
  };

  return (
    <div className="course-admin">
      <div className="admin-header">
        <h1>Templates</h1>
        <div className="header-buttons">
          <button className="btn-add-course" onClick={openAdd}>Add Template</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      <div className="courses-grid">
        {items.map(item => (
          <div key={item.id} className="course-item">
            <div className="course-info">
              <div className="course-thumb">
                {item.thumbnail || item.imgurl ? (
                  <img src={item.thumbnail || item.imgurl} alt={item.title} />
                ) : (
                  <div className="empty-thumb">No Image</div>
                )}
              </div>
              <div>
                <h3>{item.title}</h3>
                <p className="muted">{item.category}</p>
              </div>
            </div>
            <div className="course-actions">
              <button className="btn-add-course" onClick={() => openEdit(item)}>Edit</button>
              <button className="btn-cancel" onClick={() => remove(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="course-form-modal" onClick={() => setShowForm(false)}>
          <div className="course-form-container" onClick={(e) => e.stopPropagation()}>
            <div className="form-header">
              <h2>{editing ? "Edit Template" : "Add Template"}</h2>
              <button className="btn-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form className="course-form" onSubmit={save}>
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Upload Thumbnail</label>
                <input type="file" accept="image/*" onChange={e => setFileThumb(e.target.files?.[0] || null)} />
                {(fileThumb || form.thumbnail) && (
                  <div style={{ marginTop: 8 }}>
                    <img
                      alt="thumb"
                      src={fileThumb ? URL.createObjectURL(fileThumb) : form.thumbnail}
                      style={{ maxHeight: 120, borderRadius: 6 }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Preview URL</label>
                <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
              </div>
              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <input value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Last Updated</label>
                <input value={form.lastUpdated} onChange={e => setForm({ ...form, lastUpdated: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Views</label>
                <input value={form.views} onChange={e => setForm({ ...form, views: e.target.value })} />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-save" disabled={uploading}>
                  {uploading ? "Uploading..." : editing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
