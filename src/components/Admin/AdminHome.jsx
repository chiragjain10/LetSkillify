import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminHome() {
  const [users, setUsers] = useState(0);
  const [courses, setCourses] = useState(0);
  const [blogs, setBlogs] = useState(0);

  useEffect(() => {
    const load = async () => {
      const u = await getDocs(collection(db, "users"));
      const c = await getDocs(collection(db, "courses"));
      const b = await getDocs(collection(db, "blogs"));
      setUsers(u.size);
      setCourses(c.size);
      setBlogs(b.size);
    };
    load();
  }, []);

  return (
    <>
      <h2>Overview</h2>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="fs-4">{users}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Courses</h5>
              <p className="fs-4">{courses}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h5 className="card-title">Blogs</h5>
              <p className="fs-4">{blogs}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
