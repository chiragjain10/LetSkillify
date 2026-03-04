import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";

export default function BlogsAdminList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this blog?");
    if (!ok) return;
    await deleteDoc(doc(db, "blogs", id));
    await load();
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Blogs</h3>
        <button className="btn btn-primary btn-sm" onClick={() => navigate("/admin/blogs/new")}>
          Add New
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Created</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id}>
                  <td>{b.title}</td>
                  <td>{b.slug}</td>
                  <td>{b.createdAt ? new Date(b.createdAt.seconds * 1000).toLocaleDateString() : "-"}</td>
                  <td className="text-end">
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => navigate(`/blog/${b.slug || b.id}`)}>
                      View
                    </button>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/admin/blogs/${b.id}/edit`)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
