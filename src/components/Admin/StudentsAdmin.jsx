import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "./CourseAdmin.css";

export default function StudentsAdmin() {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "students"));
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setUploadedImages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
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
        await addDoc(collection(db, "students"), {
          image: imageUrl,
          createdAt: new Date().toISOString()
        });
        return imageUrl;
      });
      
      await Promise.all(uploadPromises);
      setFiles([]);
      await fetchImages();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    await deleteDoc(doc(db, "students", id));
    await fetchImages();
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Students Gallery</h3>
      </div>

      <div className="card p-4 mb-4">
        <div className="text-center">
          <h5 className="mb-3">Upload Files</h5>
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
              <p className="text-muted">{files.length} file(s) selected</p>
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
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      </div>

      <div className="card p-3">
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 mb-0">Loading images...</p>
          </div>
        ) : uploadedImages.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-images text-muted" style={{ fontSize: "3rem" }}></i>
            <p className="mt-2 mb-0 text-muted">No images uploaded yet.</p>
          </div>
        ) : (
          <div className="row g-3">
            {uploadedImages.map((img) => (
              <div key={img.id} className="col-md-3 col-sm-4 col-6">
                <div className="card border">
                  <img src={img.image} alt="Student" className="card-img-top" style={{ height: "150px", objectFit: "cover" }} />
                  <div className="card-body p-2 text-center">
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(img.id)}>
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
