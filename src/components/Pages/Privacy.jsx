import React from 'react'

function Privacy() {
    return (
        <>
            <div className="container">
                <div className='my-5'>
                    <h1 className='my-4'>Privacy & Policy</h1>
                </div>
                <div className="my-3">
                    <img style={{ height: '350px' ,objectFit:'cover'}} src="/assets/images/footer/po.jpg" alt="" />
                </div>
                <div className="my-3 py-2">
                    <h5 className="d-inline-block me-2">Effective Date: </h5><span>04 Jan 2021</span>
                    <p>At LetSkillify, accessible from www.letskillify.com, we are committed to protecting your personal information and respecting your privacy. This Privacy Policy outlines how we collect, use, and disclose your information when you use our website and services.</p>
                    <h5>1. Information We Collect</h5>
                    <p>We collect different types of information to provide and improve our services to you:</p>
                    <h6>a. Personal Information</h6>
                    <p>When you register for a course, subscribe to our newsletter, or interact with our website, we may ask you to provide certain personally identifiable information, including but not limited to:</p>
                    <ul>
                        <li>Name</li>
                        <li>Email address </li>
                        <li>Phone number</li>
                        <li>Address</li>
                        <li>Payment information (collected through secure payment gateways)</li>
                    </ul>
                    <h6>b. Usage Data</h6>
                    <p>We may collect information about how our website and services are accessed and used. This Usage Data may include information such as your computer's Internet Protocol (IP) address, browser type, browser version, the pages of our website that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.</p>
                    <h6>c. Cookies and Tracking Technologies</h6>
                    <p>We use cookies and similar tracking technologies to monitor activity on our website and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                    <h5>2. How We Use Your Information</h5>
                    <p>LetSkillify uses the collected data for various purposes, including but not limited to:</p>
                    <ul>
                        <li>To provide and maintain our services</li>
                        <li>To process your transactions</li>
                        <li>To send you updates about our courses, services, and promotional offers</li>
                        <li>To improve, personalize, and expand our website and services</li>
                        <li>To understand and analyze how you use our website</li>
                        <li>To detect, prevent, and address technical issues</li>
                        <li>To comply with legal obligations</li>
                    </ul>
                    <h5>3. Sharing Your Information</h5>
                    <p>We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as required by law or in the following situations:</p>
                    <ul>
                        <li><h6 className='d-inline-block mb-0'>Service Providers:</h6> <span>We may share your information with third-party service providers to perform functions and provide services to us, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing.</span></li>
                        <li><h6 className='d-inline-block'>Legal Compliance: </h6> <span>We may disclose your information where we are legally required to do so to comply with applicable law, regulation, or governmental request.</span></li>
                    </ul>
                    <h5>4. Data Security</h5>
                    <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                    <h5>5. Your Data Protection Rights</h5>
                    <p>Depending on your location, you may have the following rights concerning your personal data:</p>
                    <ul>
                        <li>The right to access, update, or delete the information we have on you </li>
                        <li>The right to rectify inaccurate data</li>
                        <li>The right to object to our processing of your personal data</li>
                        <li>The right to request data portability</li>
                        <li>The right to withdraw consent</li>
                    </ul>

                    <p>If you wish to exercise any of these rights, please contact us at support@letskillify.com.</p>
                    <h5>6. Third-Party Websites</h5>
                    <p>Our website may contain links to third-party websites. This Privacy Policy does not apply to those websites. We encourage you to review the privacy policies of any third-party sites before providing your personal information.</p>
                    <h5>7. Changes to This Privacy Policy</h5>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated "Effective Date." You are advised to review this Privacy Policy periodically for any changes.</p>
                    <h5>8. Contact Us</h5>
                    <p>If you have any questions about this Privacy Policy or your personal information, please contact us:</p>
                    <div className='my-3 py-4'>
                        <h5 className="mb-2 d-inline-block">Email:</h5><p className="d-inline-block ps-2"><a className="ancr" href="mailto:contact@letskillify.com" style={{ cursor: "pointer", color: "#747579" }}> contact@letskillify.com</a></p><br />
                        <h5 className="d-inline-block">Address: </h5><p className="d-inline-block ps-2">  F 30/31, First Floor, A Wing, Express Zone Mall, Off. W E Highway, Near Oberoi Signal, Goregaon East, Mumbai – 400063</p>
                    </div>

                </div>
            </div >
        </>
    )
}

export default Privacy