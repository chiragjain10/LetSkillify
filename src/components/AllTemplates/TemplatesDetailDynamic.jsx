import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function TemplatesDetailDynamic() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const ref = doc(db, "templates", id);
        const snap = await getDoc(ref);
        if (snap.exists()) setData({ id: snap.id, ...snap.data() });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container py-5 text-center">
        <h3>Template not found</h3>
        <Link to="/templates" className="course-btn-enhanced mt-3">Back to Templates</Link>
      </div>
    );
  }

  return (
    <section className="pt-3 pt-xl-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-xl-8">
            <div className="mb-3">
              <h2>{data.title}</h2>
              <p className="text-muted">{data.description}</p>
              <div className="d-flex gap-3 small">
                <span><i className="fas fa-star me-1 text-warning" /> {data.rating || "4.5"}/5.0</span>
                <span><i className="bi bi-patch-exclamation-fill me-1" /> {data.lastUpdated || "Recently updated"}</span>
              </div>
            </div>
            <div className="rounded-3 bg-light p-3 text-center">
              <img
                src={data.thumbnail || "/assets/images/default.jpeg"}
                alt={data.title}
                className="img-fluid"
                onError={(e) => { e.currentTarget.src = "/assets/images/default.jpeg"; }}
              />
            </div>
            <div className="card border mt-4">
              <div className="card-header border-bottom">
                <h3 className="mb-0">About this Template</h3>
              </div>
              <div className="card-body">
                <p>{data.description}</p>
                <p className="mb-0">Live preview: <a href={data.url} target="_blank" rel="noreferrer">{data.url}</a></p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 mt-5 mt-xl-0">
            <div className="card card-body border p-4 sticky-top" style={{ top: "100px" }}>
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="fw-bold mb-0 me-2">Price: {data.price || "₹—"}</h3>
              </div>
              <div className="d-flex align-items-center mt-3">
                <div className="avatar avatar-lg">
                  <img className="avatar-img rounded-circle" src={data.thumbnail || "/assets/images/default.jpeg"} alt="thumb" />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0">{data.category}</h6>
                  <p className="mb-0 small">{data.lastUpdated || "Recently updated"}</p>
                </div>
              </div>
              <div className="mt-4 d-grid gap-2">
                <a href={data.url} target="_blank" rel="noreferrer" className="course-btn-enhanced">Live Preview</a>
                <button className="course-btn-enhanced course-btn-secondary">Buy now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
