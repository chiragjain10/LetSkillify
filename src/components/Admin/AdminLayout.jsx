import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CourseAdmin.css";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => (location.pathname === path ? "fw-bold" : "");

  return (
    <div className="d-flex w-100" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar (desktop, sticky) */}
      <div className="d-none d-md-block">
        <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px", position: "sticky", top: 0 }}>
          <h4 className="mb-4">Admin</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin")}`} to="/admin">
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/users")}`} to="/admin/users">
                <i className="bi bi-people me-2"></i> Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/courses")}`} to="/admin/courses">
                <i className="bi bi-journal-bookmark me-2"></i> Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/works")}`} to="/admin/works">
                <i className="bi bi-collection me-2"></i> Our Works
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/partners")}`} to="/admin/partners">
                <i className="bi bi-people-fill me-2"></i> Trusted Partners
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/templates")}`} to="/admin/templates">
                <i className="bi bi-window-sidebar me-2"></i> Templates
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/certificates")}`} to="/admin/certificates">
                <i className="bi bi-patch-check me-2"></i> Certificates
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/activities")}`} to="/admin/activities">
                <i className="bi bi-calendar-event me-2"></i> Activities
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/adventures")}`} to="/admin/adventures">
                <i className="bi bi-compass me-2"></i> Adventures
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/celebrations")}`} to="/admin/celebrations">
                <i className="bi bi-balloon me-2"></i> Celebrations
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/team")}`} to="/admin/team">
                <i className="bi bi-people me-2"></i> Team Members
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link text-white btn btn-link text-start ${isActive("/admin/blogs")}`} to="/admin/blogs">
                <i className="bi bi-file-text me-2"></i> Blogs
              </Link>
            </li>
          </ul>
          <div className="mt-3">
            <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/")}>
              <i className="bi bi-house me-1"></i> Back to Site
            </button>
          </div>
        </div>
      </div>

      {/* Offcanvas Sidebar (mobile) */}
      <div className="offcanvas offcanvas-start d-md-none" tabIndex="-1" id="adminSidebarOffcanvas" aria-labelledby="adminSidebarOffcanvasLabel" style={{ width: "350px" }}>
        <div className="offcanvas-body bg-dark text-white py-3">
          <div className="px-3 py-2">
            <div className="text-center mb-3">
              <div className="avatar avatar-lg mb-2">
                <img src="/assets/images/icon_fav.ico" alt="LetSkillify" />
              </div>
              <h6 className="mb-1">Administrator</h6>
              <small className="text-muted">admin@letskillify.com</small>
            </div>
          </div>
          <ul className="nav flex-column px-3">
            <li className="nav-item">
              <Link data-bs-dismiss="offcanvas" className={`nav-link text-white py-3 ${isActive("/admin")}`} to="/admin">
                <i className="bi bi-speedometer2 me-3 fs-5"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link data-bs-dismiss="offcanvas" className={`nav-link text-white py-3 ${isActive("/admin/users")}`} to="/admin/users">
                <i className="bi bi-people me-3 fs-5"></i> Users
              </Link>
            </li>
            <li className="nav-item">
              <Link data-bs-dismiss="offcanvas" className={`nav-link text-white py-3 ${isActive("/admin/courses")}`} to="/admin/courses">
                <i className="bi bi-journal-bookmark me-3 fs-5"></i> Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link data-bs-dismiss="offcanvas" className={`nav-link text-white py-3 ${isActive("/admin/works")}`} to="/admin/works">
                <i className="bi bi-collection me-3 fs-5"></i> Our Works
              </Link>
            </li>
            <li className="nav-item">
              <Link data-bs-dismiss="offcanvas" className={`nav-link text-white py-3 ${isActive("/admin/partners")}`} to="/admin/partners">
                <i className="bi bi-people-fill me-3 fs-5"></i> Trusted Partners
              </Link>
            </li>
            <li className="nav-item">
              <Link data-bs-dismiss="offcanvas" className={`nav-link text-white py-3 ${isActive("/admin/templates")}`} to="/admin/templates">
                <i className="bi bi-window-sidebar me-3 fs-5"></i> Templates
              </Link>
            </li>
            <li className="nav-item">
              <Link data-bs-dismiss="offcanvas" className={`nav-link text-white py-3 ${isActive("/admin/celebrations")}`} to="/admin/celebrations">
                <i className="bi bi-balloon me-3 fs-5"></i> Celebrations
              </Link>
            </li>
            <li className="nav-item">
              <Link data-bs-dismiss="offcanvas" className={`nav-link text-white py-3 ${isActive("/admin/team")}`} to="/admin/team">
                <i className="bi bi-people me-3 fs-5"></i> Team Members
              </Link>
            </li>
            <li className="nav-item">
              <Link data-bs-dismiss="offcanvas" className={`nav-link text-white py-3 ${isActive("/admin/blogs")}`} to="/admin/blogs">
                <i className="bi bi-file-text me-3 fs-5"></i> Blogs
              </Link>
            </li>
          </ul>
          <div className="px-3 py-3 mt-4 border-top border-secondary">
            <button className="btn btn-outline-light btn-sm w-100" onClick={() => navigate("/")}>
              <i className="bi bi-house me-2"></i> Back to Site
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ height: "100vh", overflowY: "auto" }}>
        {/* Topbar */}
        <nav className="navbar navbar-light bg-light px-3 shadow-sm d-flex justify-content-between position-sticky top-0 p-2" style={{ zIndex: 1020 }}>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary btn-sm d-md-none me-2 mb-0" data-bs-toggle="offcanvas" data-bs-target="#adminSidebarOffcanvas" aria-controls="adminSidebarOffcanvas">
              <i className="bi bi-list fs-5"></i>
            </button>
            <span className="navbar-brand mb-0 fw-bold">Admin Panel</span>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary btn-sm me-2 position-relative">
              <i className="bi bi-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.6rem" }}>3</span>
            </button>
            <div className="dropdown">
              <button className="btn btn-outline-secondary btn-sm dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-circle fs-5 me-1"></i>
                <span className="d-none d-sm-inline">Admin</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
                <li><a className="dropdown-item" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-danger" href="#"><i className="bi bi-box-arrow-right me-2"></i>Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="p-3 p-md-4">
          <Outlet />
        </div>
        
        {/* WhatsApp Floating Button (Mobile) */}
        <a 
          href="https://wa.me/919876543210" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="position-fixed bottom-0 end-0 m-3 d-md-none"
          style={{ zIndex: 1050 }}
        >
          <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: "56px", height: "56px" }}>
            <i className="bi bi-whatsapp fs-4"></i>
          </div>
        </a>
      </div>
    </div>
  );
}
