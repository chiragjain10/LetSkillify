import React, { useEffect, useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./CourseAdmin.css";

export default function WorksAdmin() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", img: "", link: "" });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "our_works"));
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setForm({ name: "", img: "", link: "" });
    setEditing(null);
    setShowForm(true);
    setFile(null);
  };

  const openEdit = (item) => {
    setForm({ name: item.name || "", img: item.img || "", link: item.link || "" });
    setEditing(item);
    setShowForm(true);
    setFile(null);
  };

  const uploadToCloudinary = async (f) => {
    const formData = new FormData();
    formData.append("file", f);
    formData.append("upload_preset", "Letskillify");
    const res = await fetch("https://api.cloudinary.com/v1_1/dob3psxy1/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  };

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload = { ...form };
      if (file) {
        setUploading(true);
        const url = await uploadToCloudinary(file);
        payload.img = url;
        setUploading(false);
      }
      if (editing) await updateDoc(doc(db, "our_works", editing.id), payload);
      else await addDoc(collection(db, "our_works"), payload);
      setShowForm(false);
      setFile(null);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this item?")) return;
    await deleteDoc(doc(db, "our_works", id));
    await load();
  };

  return (
    <div className="course-admin">
      <div className="admin-header">
        <h1>Our Works</h1>
        <div className="header-buttons">
          <button className="btn-add-course" onClick={openAdd}>Add Work</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      <div className="courses-grid">
        {items.map(item => (
          <div key={item.id} className="course-item">
            <div className="course-info">
              <div className="course-thumb">
                {item.img ? <img src={item.img} alt={item.name} /> : <div className="empty-thumb">No Image</div>}
              </div>
              <div>
                <h3>{item.name}</h3>
                <p className="muted">{item.link}</p>
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
              <h2>{editing ? "Edit Work" : "Add Work"}</h2>
              <button className="btn-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form className="course-form" onSubmit={save}>
              <div className="form-group">
                <label>Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Upload Image</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                {(file || form.img) && (
                  <div style={{ marginTop: 8 }}>
                    <img
                      alt="preview"
                      src={file ? URL.createObjectURL(file) : form.img}
                      style={{ maxHeight: 120, borderRadius: 6 }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Link</label>
                <input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
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
