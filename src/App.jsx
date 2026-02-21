import "./App.css";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import Home from "./components/Home/Home.jsx";
import ContactUs from "./components/Contact/ContactUs.jsx";
import About from "./components/About/About.jsx";
import CoursesList from "./components/Courses/CoursesList.jsx";
import TopScroll from "./components/TopScroll.jsx";

// Lazy load heavy components
const CourseDetail = lazy(() => import("./components/Courses/CourseDetail.jsx"));
const Products = lazy(() => import("./components/Products/Products.jsx"));
const ProductsDetail = lazy(() => import("./components/Products/ProductsDetails.jsx"));
const Templates = lazy(() => import("./components/AllTemplates/Templates.jsx"));
const Review = lazy(() => import("./components/Reviews/Review.jsx"));
const SignUp = lazy(() => import("./components/Auth/SignUp.jsx"));
const Login = lazy(() => import("./components/Auth/Login.jsx"));
const TemplatesDetail = lazy(() => import("./components/AllTemplates/TemplatesDetailDynamic.jsx"));
const Privacy = lazy(() => import("./components/Pages/Privacy.jsx"));
const Disclaimer = lazy(() => import("./components/Pages/Disclaimer.jsx"));
const TermCondition = lazy(() => import("./components/Pages/TermCondition.jsx"));
const Member = lazy(() => import("./components/Became A member/Member.jsx"));
const Cart = lazy(() => import("./components/Cart/Cart.jsx"));
import { MainProvider } from "./components/Cart/MainProvider.jsx";
const NotFound = lazy(() => import("./components/NotFound/NotFound.jsx"));
const Wishlist = lazy(() => import("./components/wishlist/wishlist.jsx"));
const Preloader = lazy(() => import("./components/preloader/preloader.jsx"));
const Celebration = lazy(() => import("./components/Home/Celebration.jsx"));
const Activities = lazy(() => import("./components/Home/Activities.jsx"));
const AdventureImage = lazy(() => import("./components/Home/Adventure.jsx"));
const Certificate = lazy(() => import("./components/About/Certificate.jsx"));
const Founder = lazy(() => import("./components/About/Founder.jsx"));
const Offering = lazy(() => import("./components/About/Offering.jsx"));
const TeamMember = lazy(() => import("./components/About/TeamMember.jsx"));
const AdminDashboard = lazy(() => import("./components/Admin/Admin.jsx"));
const ForgetPassword = lazy(() => import("./components/Auth/ForgetPassword.jsx"));
const CourseAdmin = lazy(() => import("./components/Admin/CourseAdmin.jsx"));
const WorksAdmin = lazy(() => import("./components/Admin/WorksAdmin.jsx"));
const PartnersAdmin = lazy(() => import("./components/Admin/PartnersAdmin.jsx"));
const TemplatesAdmin = lazy(() => import("./components/Admin/TemplatesAdmin.jsx"));
const CertificateAdmin = lazy(() => import("./components/Admin/CertificateAdmin.jsx"));
const BlogPage = lazy(() => import("./components/Blog/Blogs.jsx"));
const BlogForm = lazy(() => import("./components/Blog/AddBlogs.jsx"));
const BlogDetail = lazy(() => import("./components/Blog/BlogDetails.jsx"));
const AdminLogin = lazy(() => import("./components/Admin/AdminLogin.jsx"));
const AdminLayout = lazy(() => import("./components/Admin/AdminLayout.jsx"));
const AdminHome = lazy(() => import("./components/Admin/AdminHome.jsx"));
const UsersAdmin = lazy(() => import("./components/Admin/UsersAdmin.jsx"));
const ActivityForm = lazy(() => import("./components/Admin/ActivitiesAdmin.jsx"));
const CelebrationForm = lazy(() => import("./components/Admin/CelebrationAdmin.jsx"));
const AdventureForm = lazy(() => import("./components/Admin/AdventureAdmin.jsx"));
const TeamForm = lazy(() => import("./components/Admin/TeamAdmin.jsx"));

function App() {
  const [bootLoading, setBootLoading] = React.useState(true);
  React.useEffect(() => {
    const onLoad = () => setBootLoading(false);
    window.addEventListener("load", onLoad);
    const t = setTimeout(() => setBootLoading(false), 1200);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
    };
  }, []);
  if (bootLoading) return <Preloader />;
  return (
    <>
      <div>
        <MainProvider>
          <Suspense fallback={<Preloader />}>
            <TopScroll />
            <Navbar />
            <HelmetProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
                <Route path="/courses" element={<Suspense fallback={<div>Loading...</div>}><CoursesList /></Suspense>} />
                <Route path="/blogs" element={<Suspense fallback={<div>Loading...</div>}><BlogPage /></Suspense>} />

                <Route
                  path="/courses/courseDetails/"
                  element={<Suspense fallback={<div>Loading...</div>}><CourseDetail /></Suspense>}
                />

                <Route path="/products" element={<Suspense fallback={<div>Loading...</div>}><Products /></Suspense>} />
                <Route
                  path="/products/productdetails/:id"
                  element={<Suspense fallback={<div>Loading...</div>}><ProductsDetail /></Suspense>}
                />
                <Route path="/templates" element={<Suspense fallback={<div>Loading...</div>}><Templates /></Suspense>} />
                <Route
                  path="/templates/TemplatesDetail/:id"
                  element={<Suspense fallback={<div>Loading...</div>}><TemplatesDetail /></Suspense>}
                />
                <Route path="/contact" element={<Suspense fallback={<div>Loading...</div>}><ContactUs /></Suspense>} />
                <Route path="/feedbacks" element={<Suspense fallback={<div>Loading...</div>}><Review /></Suspense>} />
                <Route path="/founder" element={<Suspense fallback={<div>Loading...</div>}><Founder /></Suspense>} />
                <Route path="/teammember" element={<Suspense fallback={<div>Loading...</div>}><TeamMember /></Suspense>} />
                <Route path="/offering" element={<Suspense fallback={<div>Loading...</div>}><Offering /></Suspense>} />
                <Route path="/certificate" element={<Suspense fallback={<div>Loading...</div>}><Certificate /></Suspense>} />
                <Route path="/privacypolicy" element={<Suspense fallback={<div>Loading...</div>}><Privacy /></Suspense>} />
                <Route path="/disclaimer" element={<Suspense fallback={<div>Loading...</div>}><Disclaimer /></Suspense>} />
                <Route path="/term&Condition" element={<Suspense fallback={<div>Loading...</div>}><TermCondition /></Suspense>} />
                <Route path="/becamemember" element={<Suspense fallback={<div>Loading...</div>}><Member /></Suspense>} />
                <Route path="/signup" element={<Suspense fallback={<div>Loading...</div>}><SignUp /></Suspense>} />
                <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
                <Route path="/cart" element={<Suspense fallback={<div>Loading...</div>}><Cart /></Suspense>} />
                <Route path="/wishlist" element={<Suspense fallback={<div>Loading...</div>}><Wishlist /></Suspense>} />
                <Route path="/courses/courseDetails/:slug" element={<Suspense fallback={<div>Loading...</div>}><CourseDetail /></Suspense>} />
                <Route path="/adminlogin" element={<Suspense fallback={<div>Loading...</div>}><AdminLogin /></Suspense>} />

                <Route path="/celebration" element={<Suspense fallback={<div>Loading...</div>}><Celebration /></Suspense>} />
                <Route path="/activities" element={<Suspense fallback={<div>Loading...</div>}><Activities /></Suspense>} />
                <Route path="/adventure" element={<Suspense fallback={<div>Loading...</div>}><AdventureImage /></Suspense>} />
                <Route path="/admin_dash" element={<Suspense fallback={<div>Loading...</div>}><AdminDashboard /></Suspense>} />
                <Route path="/forgetpassword" element={<Suspense fallback={<div>Loading...</div>}><ForgetPassword /></Suspense>} />
                {/* Admin area with persistent sidebar */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Suspense fallback={<div>Loading...</div>}><AdminHome /></Suspense>} />
                  <Route path="users" element={<Suspense fallback={<div>Loading...</div>}><UsersAdmin /></Suspense>} />
                  <Route path="courses" element={<Suspense fallback={<div>Loading...</div>}><CourseAdmin /></Suspense>} />
                  <Route path="works" element={<Suspense fallback={<div>Loading...</div>}><WorksAdmin /></Suspense>} />
                  <Route path="partners" element={<Suspense fallback={<div>Loading...</div>}><PartnersAdmin /></Suspense>} />
                  <Route path="templates" element={<Suspense fallback={<div>Loading...</div>}><TemplatesAdmin /></Suspense>} />
                  <Route path="certificates" element={<Suspense fallback={<div>Loading...</div>}><CertificateAdmin /></Suspense>} />
                  <Route path="blogs" element={<Suspense fallback={<div>Loading...</div>}><BlogForm /></Suspense>} />
                  <Route path="activities" element={<Suspense fallback={<div>Loading...</div>}><ActivityForm /></Suspense>} />
                  <Route path="celebrations" element={<Suspense fallback={<div>Loading...</div>}><CelebrationForm /></Suspense>} />
                  <Route path="adventures" element={<Suspense fallback={<div>Loading...</div>}><AdventureForm /></Suspense>} />
                  <Route path="team" element={<Suspense fallback={<div>Loading...</div>}><TeamForm /></Suspense>} />
                </Route>
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </HelmetProvider>
            <Footer />
          </Suspense>
        </MainProvider>
      </div>
    </>
  );
}

export default App;
