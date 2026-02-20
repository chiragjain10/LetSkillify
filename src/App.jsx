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
import CourseDetail from "./components/Courses/CourseDetail.jsx";
import Products from "./components/Products/Products.jsx";
import ProductsDetail from "./components/Products/ProductsDetails.jsx";
import Templates from "./components/AllTemplates/Templates.jsx";
import Review from "./components/Reviews/Review.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import Login from "./components/Auth/Login.jsx";
import TemplatesDetail from "./components/AllTemplates/TemplatesDetailDynamic.jsx";
import Privacy from "./components/Pages/Privacy.jsx";
import Disclaimer from "./components/Pages/Disclaimer.jsx";
import TermCondition from "./components/Pages/TermCondition.jsx";
import Member from "./components/Became A member/Member.jsx";
import Cart from "./components/Cart/Cart.jsx";
import { MainProvider } from "./components/Cart/MainProvider.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Wishlist from "./components/wishlist/wishlist.jsx";
import Preloader from "./components/preloader/preloader.jsx";
import Celebration from "./components/Home/Celebration.jsx";
import Activities from "./components/Home/Activities.jsx";
import AdventureImage from "./components/Home/Adventure.jsx";
import Certificate from "./components/About/Certificate.jsx";
import Founder from "./components/About/Founder.jsx";
import Offering from "./components/About/Offering.jsx";
import TeamMember from "./components/About/TeamMember.jsx";
import AdminDashboard from "./components/Admin/Admin.jsx";
import ForgetPassword from "./components/Auth/ForgetPassword.jsx";
import CourseAdmin from "./components/Admin/CourseAdmin.jsx";
import WorksAdmin from "./components/Admin/WorksAdmin.jsx";
import PartnersAdmin from "./components/Admin/PartnersAdmin.jsx";
import TemplatesAdmin from "./components/Admin/TemplatesAdmin.jsx";
import CertificateAdmin from "./components/Admin/CertificateAdmin.jsx";
import BlogPage from "./components/Blog/Blogs.jsx";
import BlogForm from "./components/Blog/AddBlogs.jsx";
import BlogDetail from "./components/Blog/BlogDetails.jsx";

import "./components/preloader/preloader.css";
import AdminLogin from "./components/Admin/AdminLogin.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminHome from "./components/Admin/AdminHome.jsx";
import UsersAdmin from "./components/Admin/UsersAdmin.jsx";
import ActivityForm from "./components/Admin/ActivitiesAdmin.jsx";
import CelebrationForm from "./components/Admin/CelebrationAdmin.jsx";
import AdventureForm from "./components/Admin/AdventureAdmin.jsx";
import TeamForm from "./components/Admin/TeamAdmin.jsx";

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
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<CoursesList />} />
                <Route path="/blogs" element={<BlogPage />} />

                <Route
                  path="/courses/courseDetails/" element={<CourseDetail />} />


                <Route path="/products" element={<Products />} />
                <Route
                  path="/products/productdetails/:id"
                  element={<ProductsDetail />}
                />
                <Route path="/templates" element={<Templates />} />
                <Route
                  path="/templates/TemplatesDetail/:id"
                  element={<TemplatesDetail />}
                />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/feedbacks" element={<Review />} />
                <Route path="/founder" element={<Founder />} />
                <Route path="/teammember" element={<TeamMember />} />
                <Route path="/offering" element={<Offering />} />
                <Route path="/certificate" element={<Certificate />} />
                <Route path="/privacypolicy" element={<Privacy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/term&Condition" element={<TermCondition />} />
                <Route path="/becamemember" element={<Member />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/courses/courseDetails/:slug" element={<CourseDetail />} />
                <Route path="/adminlogin" element={<AdminLogin />} />

                <Route path="/celebration" element={<Celebration />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/adventure" element={<AdventureImage />} />
                <Route path="/admin_dash" element={<AdminDashboard />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                {/* Admin area with persistent sidebar */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminHome />} />
                  <Route path="users" element={<UsersAdmin />} />
                  <Route path="courses" element={<CourseAdmin />} />
                  <Route path="works" element={<WorksAdmin />} />
                  <Route path="partners" element={<PartnersAdmin />} />
                  <Route path="templates" element={<TemplatesAdmin />} />
                  <Route path="certificates" element={<CertificateAdmin />} />
                  <Route path="blogs" element={<BlogForm />} />
                  <Route path="activities" element={<ActivityForm />} />
                  <Route path="celebrations" element={<CelebrationForm />} />
                  <Route path="adventures" element={<AdventureForm />} />
                  <Route path="team" element={<TeamForm />} />
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
