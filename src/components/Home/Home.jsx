import React from 'react'
import Banner from './Banner'
import CallToAction from './callToAction'
// import FeedBack from './FeedBack'
import HomePopularCourses from './home_popular-courses'
import HomeCourses from './homeCourses'
import HomeAbout from './HomeAbout'
import OurWorks from './OurWorks'
import TrustedPartners from './TrustedPartners'
import Talkin from './Talkin'
import AiCourses from './AiCourses'

import { Helmet } from "react-helmet-async";
import Blogs from '../Blog/Blogs'

function Home() {
  return (
    <>
      <Helmet>
        <title>Learn Full Stack Development – Get Job Ready!</title>
        <meta name="description" content="Join our Full Stack Web Development course and build real-world projects. Get industry-ready today!" />
        <meta name="keywords" content="Full Stack, Web Development, React, Node.js, Learn Coding, IT Jobs, AI with Python course India, build your own AI, Python AI training, AI for students, AI daily life course, AI productivity hacks, learn AI tools India" />
        <meta property="og:title" content="Learn Full Stack Development – Get Job Ready!" />
        <meta property="og:description" content="Boost your career with our hands-on web development training." />
        <meta property="og:image" content="https://letskillify.com/assets/images/icon/ls-nav.png" />
      </Helmet>
      
      <Banner />
      <AiCourses />
      {/* <HomePopularCourses /> */}
      <HomeAbout />
      <HomeCourses />
      <OurWorks />
      <TrustedPartners />
      <CallToAction />
      <Blogs/>

      <Talkin />
      {/* <FeedBack /> */}
    </>
  )
}

export default Home
