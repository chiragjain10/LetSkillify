import React, { useEffect, useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./CourseAdmin.css";

export default function PartnersAdmin() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ParnerName: "", img: "", originalImg: "", link: "" });
  const [fileTransparent, setFileTransparent] = useState(null);
  const [fileOriginal, setFileOriginal] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "trusted_partners"));
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setForm({ ParnerName: "", img: "", originalImg: "", link: "" });
    setEditing(null);
    setShowForm(true);
    setFileTransparent(null);
    setFileOriginal(null);
  };

  const openEdit = (item) => {
    setForm({
      ParnerName: item.ParnerName || "",
      img: item.img || "",
      originalImg: item.originalImg || "",
      link: item.link || ""
    });
    setEditing(item);
    setShowForm(true);
    setFileTransparent(null);
    setFileOriginal(null);
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
      if (fileTransparent || fileOriginal) {
        setUploading(true);
        if (fileTransparent) payload.img = await uploadToCloudinary(fileTransparent);
        if (fileOriginal) payload.originalImg = await uploadToCloudinary(fileOriginal);
        setUploading(false);
      }
      if (editing) await updateDoc(doc(db, "trusted_partners", editing.id), payload);
      else await addDoc(collection(db, "trusted_partners"), payload);
      setShowForm(false);
      setFileTransparent(null);
      setFileOriginal(null);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this partner?")) return;
    await deleteDoc(doc(db, "trusted_partners", id));
    await load();
  };

  return (
    <div className="course-admin">
      <div className="admin-header">
        <h1>Trusted Partners</h1>
        <div className="header-buttons">
          <button className="btn-add-course" onClick={openAdd}>Add Partner</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      <div className="courses-grid">
        {items.map(item => (
          <div key={item.id} className="course-item">
            <div className="course-info">
              <div className="course-thumb">
                {item.img ? <img src={item.img} alt={item.ParnerName} /> : <div className="empty-thumb">No Image</div>}
              </div>
              <div>
                <h3>{item.ParnerName}</h3>
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
              <h2>{editing ? "Edit Partner" : "Add Partner"}</h2>
              <button className="btn-close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form className="course-form" onSubmit={save}>
              <div className="form-group">
                <label>Name</label>
                <input value={form.ParnerName} onChange={e => setForm({ ...form, ParnerName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Upload Transparent Logo</label>
                <input type="file" accept="image/*" onChange={e => setFileTransparent(e.target.files?.[0] || null)} />
                {(fileTransparent || form.img) && (
                  <div style={{ marginTop: 8 }}>
                    <img
                      alt="transparent"
                      src={fileTransparent ? URL.createObjectURL(fileTransparent) : form.img}
                      style={{ maxHeight: 100, borderRadius: 6 }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Upload Original Logo</label>
                <input type="file" accept="image/*" onChange={e => setFileOriginal(e.target.files?.[0] || null)} />
                {(fileOriginal || form.originalImg) && (
                  <div style={{ marginTop: 8 }}>
                    <img
                      alt="original"
                      src={fileOriginal ? URL.createObjectURL(fileOriginal) : form.originalImg}
                      style={{ maxHeight: 100, borderRadius: 6 }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Website Link</label>
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
