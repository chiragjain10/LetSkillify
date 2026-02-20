import "./App.css";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer";
import Home from "./Components/Home/Home.jsx";
import ContactUs from "./Components/Contact/ContactUs.jsx";
import About from "./Components/About/About.jsx";
import CoursesList from "./Components/Courses/CoursesList.jsx";
import TopScroll from "./Components/TopScroll.jsx";
import CourseDetail from "./components/Courses/CourseDetail.jsx";
import Products from "./Components/Products/Products.jsx";
import ProductsDetail from "./Components/Products/ProductsDetails.jsx";
import Templates from "./Components/AllTemplates/Templates.jsx";
import Review from "./Components/Reviews/Review.jsx";
import SignUp from "./Components/Auth/SignUp.jsx";
import Login from "./Components/Auth/Login.jsx";
import TemplatesDetail from "./Components/AllTemplates/TemplatesDetailDynamic.jsx";
import Privacy from "./Components/Pages/Privacy.jsx";
import Disclaimer from "./Components/Pages/Disclaimer.jsx";
import TermCondition from "./Components/Pages/TermCondition.jsx";
import Member from "./Components/Became A member/Member.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import { MainProvider } from "./Components/Cart/MainProvider.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Wishlist from "./Components/wishlist/wishlist.jsx";
import Preloader from "./Components/preloader/preloader.jsx";
import Celebration from "./Components/Home/Celebration.jsx";
import Activities from "./Components/Home/Activities.jsx";
import AdventureImage from "./Components/Home/Adventure.jsx";
import Certificate from "./Components/About/Certificate.jsx";
import Founder from "./Components/About/Founder.jsx";
import Offering from "./Components/About/Offering.jsx";
import TeamMember from "./Components/About/TeamMember.jsx";
import AdminDashboard from "./Components/Admin/Admin.jsx";
import ForgetPassword from "./Components/Auth/ForgetPassword.jsx";
import CourseAdmin from "./Components/Admin/CourseAdmin.jsx";
import WorksAdmin from "./Components/Admin/WorksAdmin.jsx";
import PartnersAdmin from "./Components/Admin/PartnersAdmin.jsx";
import TemplatesAdmin from "./Components/Admin/TemplatesAdmin.jsx";
import CertificateAdmin from "./Components/Admin/CertificateAdmin.jsx";
import BlogPage from "./Components/Blog/Blogs.jsx";
import BlogForm from "./Components/Blog/AddBlogs.jsx";
import BlogDetail from "./Components/Blog/BlogDetails.jsx";

import "./Components/preloader/preloader.css";
import AdminLogin from "./Components/Admin/AdminLogin.jsx";
import AdminLayout from "./Components/Admin/AdminLayout.jsx";
import AdminHome from "./Components/Admin/AdminHome.jsx";
import UsersAdmin from "./Components/Admin/UsersAdmin.jsx";
import ActivityForm from "./Components/Admin/ActivitiesAdmin.jsx";
import CelebrationForm from "./Components/Admin/CelebrationAdmin.jsx";
import AdventureForm from "./Components/Admin/AdventureAdmin.jsx";
import TeamForm from "./Components/Admin/TeamAdmin.jsx";

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
