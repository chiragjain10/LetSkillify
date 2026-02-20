import React, { useEffect, useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./CourseAdmin.css";

export default function CertificateAdmin() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    category: "technical",
    title: "",
    issuer: "",
    completionTime: "",
    image: "",
    skills: ""
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "certificates"));
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async () => {
    if (!file) return null;
    setUploading(true);
    const url = `https://api.cloudinary.com/v1_1/dob3psxy1/image/upload`;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "Letskillify");
    const res = await fetch(url, { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    return data.secure_url || "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let imageUrl = form.image;
      if (file) {
        const up = await handleUpload();
        if (up) imageUrl = up;
      }
      const payload = {
        category: form.category || "technical",
        title: form.title,
        issuer: form.issuer,
        completionTime: form.completionTime,
        image: imageUrl,
        skills: (form.skills || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      if (editing) {
        await updateDoc(doc(db, "certificates", editing.id), payload);
      } else {
        await addDoc(collection(db, "certificates"), payload);
      }
      setForm({
        category: "technical",
        title: "",
        issuer: "",
        completionTime: "",
        image: "",
        skills: "",
      });
      setFile(null);
      setEditing(null);
      setShowForm(false);
      await fetchItems();
    } catch (err) {
      console.error("Save error", err);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (item) => {
    setEditing(item);
    setForm({
      category: item.category || "technical",
      title: item.title || "",
      issuer: item.issuer || "",
      completionTime: item.completionTime || "",
      image: item.image || "",
      skills: Array.isArray(item.skills) ? item.skills.join(", ") : (item.skills || ""),
    });
    setShowForm(true);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    await deleteDoc(doc(db, "certificates", id));
    await fetchItems();
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Certificates</h3>
        <button className="btn btn-primary btn-sm" onClick={() => { setShowForm(true); setEditing(null); }}>
          <i className="bi bi-plus-lg me-1"></i> Add New
        </button>
      </div>

      {showForm && (
        <div className="card p-3 p-md-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{editing ? "Edit Certificate" : "Add New Certificate"}</h5>
            <button type="button" className="btn-close" onClick={() => { setShowForm(false); setEditing(null); }}></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="technical">Technical</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Issuer</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Completion Time</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.completionTime}
                  onChange={(e) => setForm({ ...form, completionTime: e.target.value })}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Skills (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Or upload below"
                />
                <div className="mt-2">
                  <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0])} className="form-control mb-2" />
                  <button type="button" className="btn btn-outline-secondary btn-sm w-100" disabled={uploading || !file} onClick={async () => {
                    const up = await handleUpload();
                    if (up) setForm({ ...form, image: up });
                  }}>
                    {uploading ? "Uploading..." : "Upload Image"}
                  </button>
                </div>
                {form.image && (
                  <div className="mt-2 text-center">
                    <img src={form.image} alt="preview" className="img-fluid rounded" style={{ maxHeight: 120 }} />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button disabled={loading} className="btn btn-success btn-sm flex-fill" type="submit">
                {editing ? "Update" : "Create"}
              </button>
              <button type="button" className="btn btn-secondary btn-sm flex-fill" onClick={() => { setShowForm(false); setEditing(null); }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card p-3">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 mb-0">Loading certificates...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-award text-muted" style={{ fontSize: "3rem" }}></i>
            <p className="mt-2 mb-0 text-muted">No certificates added yet.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="d-none d-md-block">
              <div className="table-responsive">
                <table className="table table-sm align-middle">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Issuer</th>
                      <th>Category</th>
                      <th>Completion</th>
                      <th>Skills</th>
                      <th style={{ width: 150 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it) => (
                      <tr key={it.id}>
                        <td>{it.image ? <img src={it.image} alt={it.title} style={{ height: 40 }} /> : "-"}</td>
                        <td>{it.title}</td>
                        <td>{it.issuer}</td>
                        <td className="text-capitalize">{it.category}</td>
                        <td>{it.completionTime}</td>
                        <td>{Array.isArray(it.skills) ? it.skills.join(", ") : ""}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary" onClick={() => onEdit(it)}>Edit</button>
                            <button className="btn btn-outline-danger" onClick={() => onDelete(it.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Mobile Card View */}
            <div className="d-md-none">
              <div className="row g-3">
                {items.map((it) => (
                  <div key={it.id} className="col-12">
                    <div className="card border">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          {it.image && (
                            <img src={it.image} alt={it.title} className="rounded" style={{ width: 60, height: 60, objectFit: "cover" }} />
                          )}
                          <div className="flex-grow-1">
                            <h6 className="card-title mb-1">{it.title}</h6>
                            <p className="text-muted small mb-2">{it.issuer}</p>
                            <div className="d-flex flex-wrap gap-2 mb-2">
                              <span className="badge bg-primary">{it.category}</span>
                              <span className="badge bg-secondary">{it.completionTime}</span>
                            </div>
                            {Array.isArray(it.skills) && it.skills.length > 0 && (
                              <div className="mb-2">
                                {it.skills.slice(0, 3).map((skill, idx) => (
                                  <span key={idx} className="badge bg-light text-dark me-1">{skill}</span>
                                ))}
                                {it.skills.length > 3 && <span className="badge bg-light text-dark">+{it.skills.length - 3}</span>}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex gap-2 mt-3">
                          <button className="btn btn-outline-primary btn-sm flex-fill" onClick={() => onEdit(it)}>
                            <i className="bi bi-pencil me-1"></i> Edit
                          </button>
                          <button className="btn btn-outline-danger btn-sm flex-fill" onClick={() => onDelete(it.id)}>
                            <i className="bi bi-trash me-1"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

