// src/components/Admin/CourseAdmin.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../Cart/MainProvider";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./CourseAdmin.css";

const CourseAdmin = () => {
  const { setCoursesdata } = useContext(MainContext);
  const [courses, setCourses] = useState([]);
  const [viewMode, setViewMode] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "Development",
    language: "English",
    price: "",
    short_desc: "",
    thumbnail: "",
    tutor: "",
    tutorImage: "",
    rating: "",
    difficulty: "Intermediate",
    isPaid: true,
    isNew: false,
    techStack: [],
  });

  const [techStackForm, setTechStackForm] = useState({
    name: "",
    icon: "",
    color: "#000000",
  });

  const categories = [
    "Development",
    "Graphics",
    "Marketing",
    "Laws",
    "Finance",
    "Languages",
  ];
  const languages = ["English", "Hindi", "French", "Spanish"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  // 🔹 Fetch courses from Firestore
  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setCourses(coursesData);
      if (setCoursesdata) setCoursesdata(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // 🔹 Image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          thumbnail: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, thumbnail: "" });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 🔹 Form Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTechStackChange = (e) => {
    const { name, value } = e.target;
    setTechStackForm((prev) => ({ ...prev, [name]: value }));
  };

  const addTechStack = () => {
    if (techStackForm.name && techStackForm.icon) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, { ...techStackForm }],
      }));
      setTechStackForm({ name: "", icon: "", color: "#000000" });
    }
  };

  const removeTechStack = (index) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  };

  // 🔹 Submit Course (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      ...formData,
      price: parseInt(formData.price),
      rating: parseFloat(formData.rating),
      isNew: formData.isNew || false,
    };

    try {
      if (isEditing) {
        const courseRef = doc(db, "courses", editingId);
        await updateDoc(courseRef, courseData);
      } else {
        await addDoc(collection(db, "courses"), courseData);
      }
      await fetchCourses();
      resetForm();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  // 🔹 Reset form
  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      category: "Development",
      language: "English",
      price: "",
      short_desc: "",
      thumbnail: "",
      tutor: "",
      tutorImage: "",
      rating: "",
      difficulty: "Intermediate",
      isPaid: true,
      isNew: false,
      techStack: [],
    });
    setIsEditing(false);
    setEditingId(null);
    setImagePreview(null);
    setShowForm(false);
  };

  // 🔹 Edit course
  const editCourse = (course) => {
    setFormData(course);
    setIsEditing(true);
    setEditingId(course.id);
    setImagePreview(course.thumbnail || null);
    setShowForm(true);
  };

  // 🔹 Delete course
  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteDoc(doc(db, "courses", id));
        await fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  // 🔹 Filtered Courses
  const filteredCourses =
    viewMode === "paid"
      ? courses.filter((course) => course.isPaid)
      : viewMode === "new"
      ? courses.filter((course) => course.isNew)
      : courses;

  return (
    <div className="course-admin">
      <div className="admin-header">
        <h1>Course Management</h1>
        <div className="header-buttons">
          <Link to="/courses" className="btn-view-courses" target="_blank">
            View Courses
          </Link>
          <button
            className={
              viewMode === "new" ? "btn-view-courses active" : "btn-view-courses"
            }
            onClick={() => setViewMode("new")}
          >
            New Courses
          </button>
          <button className="btn-add-course" onClick={() => setShowForm(true)}>
            Add New Course
          </button>
        </div>
      </div>

      {/* 🔹 Add/Edit Form */}
      {showForm && (
        <div className="course-form-modal">
          <div className="course-form-container">
            <div className="form-header">
              <h2>{isEditing ? "Edit Course" : "Add New Course"}</h2>
              <button className="btn-close" onClick={resetForm}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Course Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Language *</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    required
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Difficulty *</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    required
                  >
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Rating (1-5) *</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    step="0.1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Instructor Name</label>
                  <input
                    type="text"
                    name="tutor"
                    value={formData.tutor}
                    onChange={handleInputChange}
                    placeholder="Instructor name"
                  />
                </div>

                <div className="form-group">
                  <label>Instructor Image URL</label>
                  <input
                    type="text"
                    name="tutorImage"
                    value={formData.tutorImage}
                    onChange={handleInputChange}
                    placeholder="URL to instructor photo"
                  />
                </div>

                <div className="form-group">
                  <label>Course Thumbnail</label>
                  <div className="image-upload-container">
                    <div className="upload-area">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="file-input"
                        id="courseThumbnail"
                      />
                      <label
                        htmlFor="courseThumbnail"
                        className="upload-label"
                      >
                        <i className="upload-icon">📷</i>
                        <span>Choose an image</span>
                      </label>
                    </div>

                    {(imagePreview || formData.thumbnail) && (
                      <div className="image-preview">
                        <img
                          src={imagePreview || formData.thumbnail}
                          alt="Preview"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="remove-image-btn"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="file-help">
                    Supported formats: JPG, PNG. Max size: 2MB
                  </p>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isPaid"
                      checked={formData.isPaid}
                      onChange={handleInputChange}
                    />
                    Paid Course
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleInputChange}
                    />
                    New Course
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Course Description *</label>
                <textarea
                  name="short_desc"
                  value={formData.short_desc}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              {/* Tech Stack Section */}
              <div className="tech-stack-section">
                <h3>Tech Stack</h3>
                <div className="tech-stack-form">
                  <input
                    type="text"
                    name="name"
                    value={techStackForm.name}
                    onChange={handleTechStackChange}
                    placeholder="Technology name (e.g., React)"
                  />
                  <input
                    type="text"
                    name="icon"
                    value={techStackForm.icon}
                    onChange={handleTechStackChange}
                    placeholder="Icon text (e.g., R)"
                    maxLength="3"
                  />
                  <input
                    type="color"
                    name="color"
                    value={techStackForm.color}
                    onChange={handleTechStackChange}
                  />
                  <button type="button" onClick={addTechStack}>
                    Add
                  </button>
                </div>

                <div className="tech-stack-preview">
                  {formData.techStack.map((tech, index) => (
                    <div key={index} className="tech-preview-item">
                      <div
                        className="tech-preview-icon"
                        style={{ backgroundColor: tech.color }}
                      >
                        {tech.icon}
                      </div>
                      <span>{tech.name}</span>
                      <button
                        type="button"
                        onClick={() => removeTechStack(index)}
                        className="btn-remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {isEditing ? "Update Course" : "Add Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Courses List */}
      <div className="courses-list">
        <h2>
          {viewMode === "all" && "All Courses"}
          {viewMode === "paid" && "Paid Courses"}
          {viewMode === "new" && "New Courses"} ({filteredCourses.length})
        </h2>
        {filteredCourses.length === 0 && <p>No courses found for this view.</p>}
        <div className="courses-table">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-item">
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>
                  {course.category} • {course.language} • ₹{course.price}
                </p>
                <p>
                  Rating: {course.rating} • {course.difficulty}
                </p>
                <p>Instructor: {course.tutor}</p>
                <p>
                  Type: {course.isPaid ? "Paid" : "Free"}{" "}
                  {course.isNew ? "• New" : ""}
                </p>
                {course.techStack && course.techStack.length > 0 && (
                  <div className="tech-stack-mini">
                    {course.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="tech-mini-icon"
                        style={{ backgroundColor: tech.color }}
                      >
                        {tech.icon}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="course-actions">
                <button onClick={() => editCourse(course)} className="btn-edit">
                  Edit
                </button>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAdmin;
