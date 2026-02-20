import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
// Firestore imports
import { db } from "../../firebase"; // <-- make sure you have firebase.js config
import { collection, getDocs } from "firebase/firestore";

function AdminDashboard() {
  const [page, setPage] = useState("dashboard");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch Courses from Firestore
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch Blogs from Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleLogout = () => {
    alert("Logged out!");
     navigate("/");
    // here you can clear tokens / redirect to login page
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        <h4 className="mb-4">Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link text-start`}
              onClick={() => navigate("/admin")}
            >
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link text-start`}
              onClick={() => navigate("/admin/users")}
            >
              <i className="bi bi-people me-2"></i> Users
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link text-start`}
              onClick={() => navigate("/admin/courses")}
            >
              <i className="bi bi-journal-bookmark me-2"></i> Courses
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link text-start`}
              onClick={() => navigate("/admin/works")}
            >
              <i className="bi bi-collection me-2"></i> Our Works
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link text-start`}
              onClick={() => navigate("/admin/partners")}
            >
              <i className="bi bi-people-fill me-2"></i> Trusted Partners
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link text-start`}
              onClick={() => navigate("/admin/templates")}
            >
              <i className="bi bi-window-sidebar me-2"></i> Templates
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link text-start`}
              onClick={() => navigate("/admin/blogs")}
            >
              <i className="bi bi-file-text me-2"></i> Blogs
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link text-start ${
                page === "products" ? "fw-bold" : ""
              }`}
              onClick={() => setPage("products")}
            >
              <i className="bi bi-box me-2"></i> Products
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link text-start ${
                page === "settings" ? "fw-bold" : ""
              }`}
              onClick={() => setPage("settings")}
            >
              <i className="bi bi-gear me-2"></i> Settings
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-light bg-light px-3 shadow-sm d-flex justify-content-between">
          <span className="navbar-brand">Admin Dashboard</span>
          <div>
            <button className="btn btn-outline-secondary btn-sm me-2">
              <i className="bi bi-bell"></i>
            </button>
            <button className="btn btn-outline-secondary btn-sm me-2">
              <i className="bi bi-person-circle"></i>
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">
          {/* Dashboard */}
          {page === "dashboard" && (
            <>
              <h2>Overview</h2>
              <div className="row mt-4">
                <div className="col-md-3">
                  <div className="card shadow-sm text-center">
                    <div className="card-body">
                      <h5 className="card-title">Users</h5>
                      <p className="fs-4">{users.length}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow-sm text-center">
                    <div className="card-body">
                      <h5 className="card-title">Courses</h5>
                      <p className="fs-4">{courses.length}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow-sm text-center">
                    <div className="card-body">
                      <h5 className="card-title">Blogs</h5>
                      <p className="fs-4">{blogs.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Users */}
          {page === "users" && (
            <>
              <h2>Users</h2>
              {loading ? (
                <p>Loading users...</p>
              ) : (
                <table className="table table-striped mt-3 shadow-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* Courses */}
          {page === "courses" && (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h2>Courses</h2>
                <div>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => navigate("/admin/courses")}
                  >
                    <i className="bi bi-plus-circle me-1"></i> Add Course
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="bi bi-list-ul me-1"></i> View Courses
                  </button>
                </div>
              </div>

              {loading ? (
                <p className="mt-3">Loading courses...</p>
              ) : (
                <div className="row mt-3">
                  {courses.map((course) => (
                    <div key={course.id} className="col-md-3">
                      <div className="card shadow-sm">
                        <div className="card-body text-center">
                          <i className="bi bi-journal-text fs-1 text-success"></i>
                          <h6 className="mt-2">{course.title}</h6>
                          <button className="btn btn-sm btn-success mt-2">
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Blogs */}
          {page === "blogs" && (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h2>Blogs</h2>
                <div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate("/admin/blogs")}
                  >
                    <i className="bi bi-plus-circle me-1"></i> Add Blog
                  </button>
                </div>
              </div>

              {loading ? (
                <p className="mt-3">Loading blogs...</p>
              ) : (
                <div className="row mt-3">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="col-md-4">
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <i className="bi bi-file-text fs-1 text-primary"></i>
                          <h6 className="mt-2">{blog.title}</h6>
                          <p className="text-muted small">
                            {blog.excerpt || "No description available"}
                          </p>
                          <button className="btn btn-sm btn-outline-primary">
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Products */}
          {page === "products" && (
            <>
              <h2>Products</h2>
              <p>Coming soon...</p>
            </>
          )}

          {/* Settings */}
          {page === "settings" && (
            <>
              <h2>Settings</h2>
              <form className="mt-3 shadow-sm p-4 border rounded bg-light">
                <div className="mb-3">
                  <label className="form-label">Site Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter site name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Notifications</label>
                  <select className="form-select">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
