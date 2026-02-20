import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "./CourseAdmin.css";

export default function TeamAdmin() {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadedMembers, setUploadedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    linkedin: ""
  });

  const fetchMembers = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "team"));
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setUploadedMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleUpload = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/dob3psxy1/image/upload`;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "Letskillify");
    const res = await fetch(url, { method: "POST", body: fd });
    const data = await res.json();
    return data.secure_url || "";
  };

  const handleMultipleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const imageUrl = await handleUpload(file);
        await addDoc(collection(db, "team"), {
          name: form.name || "Team Member",
          role: form.role || "Team Role",
          linkedin: form.linkedin || "",
          image: imageUrl,
          createdAt: new Date().toISOString()
        });
        return imageUrl;
      });
      
      await Promise.all(uploadPromises);
      setFiles([]);
      setForm({ name: "", role: "", linkedin: "" });
      setShowForm(false);
      await fetchMembers();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team member?")) return;
    await deleteDoc(doc(db, "team", id));
    await fetchMembers();
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Team Members</h3>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-lg me-1"></i> Add Team Member
        </button>
      </div>

      {showForm && (
        <div className="card p-3 p-md-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Add Team Member</h5>
            <button type="button" className="btn-close" onClick={() => { setShowForm(false); setForm({ name: "", role: "", linkedin: "" }); }}></button>
          </div>
          
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter name"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Enter role"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">LinkedIn URL (Optional)</label>
              <input
                type="url"
                className="form-control"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                placeholder="LinkedIn profile URL"
              />
            </div>
          </div>

          <div className="text-center">
            <h6 className="mb-3">Upload Member Photo</h6>
            <div className="mb-3">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(Array.from(e.target.files))}
                className="form-control"
                style={{ maxWidth: "400px", margin: "0 auto" }}
              />
            </div>
            
            {files.length > 0 && (
              <div className="mb-3">
                <p className="text-muted">{files.length} photo(s) selected</p>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  {files.map((file, index) => (
                    <div key={index} className="text-center">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="img-thumbnail"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                      <p className="small text-muted mb-0">{file.name.substring(0, 10)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button
              className="btn btn-primary"
              onClick={handleMultipleUpload}
              disabled={uploading || files.length === 0}
            >
              {uploading ? "Uploading..." : "Upload Team Member(s)"}
            </button>
          </div>
        </div>
      )}

      <div className="card p-3">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 mb-0">Loading team members...</p>
          </div>
        ) : uploadedMembers.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-people text-muted" style={{ fontSize: "3rem" }}></i>
            <p className="mt-2 mb-0 text-muted">No team members added yet.</p>
          </div>
        ) : (
          <div className="row g-3">
            {uploadedMembers.map((member) => (
              <div key={member.id} className="col-md-4 col-sm-6">
                <div className="card border">
                  <img src={member.image} alt={member.name} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                  <div className="card-body">
                    <h6 className="card-title">{member.name}</h6>
                    <p className="card-text small text-muted">{member.role}</p>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary me-2">
                        <i className="bi bi-linkedin"></i> LinkedIn
                      </a>
                    )}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(member.id)}>
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
