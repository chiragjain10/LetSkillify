import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import coursesData from './template.json'


function TemplatesDetail() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    setCourseData(coursesData.find((v) => {
      return v.id == id;
    }));
  }, [id])

  return (
    <>
      <section className="pt-3 pt-xl-5">
                <div className="container" data-sticky-container>
                    <div className="row g-4">

                        <div className="col-xl-8">

                            <div className="row g-4">

                                <div className="col-12">

                                    <h2>{courseData?.title}</h2>
                                    <p>YouTube is a global video-sharing platform where users can upload, view, and interact with diverse content. It offers various features, including monetization, live streaming, and auto-captioning, making it accessible worldwide.</p>

                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item fw-light h6 me-3 mb-1 mb-sm-0"><i className="fas fa-star me-2"></i>4.5/5.0</li>
                                        <li className="list-inline-item fw-light h6 me-3 mb-1 mb-sm-0"><i className="fas fa-user-graduate me-2"></i>12k Purchased</li>
                                        <li className="list-inline-item fw-light h6 me-3 mb-1 mb-sm-0"><i className="fas fa-signal me-2"></i>All levels</li>
                                        <li className="list-inline-item fw-light h6 me-3 mb-1 mb-sm-0"><i className="bi bi-patch-exclamation-fill me-2"></i>Last updated 09/2024</li>
                                        <li className="list-inline-item fw-light h6"><i className="fas fa-globe me-2"></i>English</li>
                                    </ul>
                                </div>
                                <div className="col-12 position-relative">
                                    <div className="video-player rounded-3">
                                        {/* <video controls crossorigin="anonymous" playsinline poster="assets/images/videos/poster.jpg" />
                                        <source src="assets/images/videos/360p.mp4" type="video/mp4" size="360" />
                                        <source src="assets/images/videos/720p.mp4" type="video/mp4" size="720" />
                                        <source src="assets/images/videos/1080p.mp4" type="video/mp4" size="1080" />

                                        <track kind="captions" label="English" srclang="en" src="assets/images/videos/en.vtt" default />
                                        <track kind="captions" label="French" srclang="fr" src="assets/images/videos/fr.vtt" /> */}
                                        <img src={courseData?.thumbnail} alt="" onError={(e) => { e.target.src = "/assets/images/default.jpeg";}} />

                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="card border">

                                        <div className="card-header border-bottom">
                                            <h3 className="mb-0">Product description</h3>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-3">Welcome to the our product <strong>Youtube</strong></p>
                                            <p className="mb-3">YouTube is a massive online platform for video sharing, creation, and consumption, offering a vast array of content ranging from entertainment and education to music, news, and personal vlogs. Launched in 2005, it was designed to allow users to upload, view, and share videos. Over time, it has grown into one of the most visited websites globally, with over two billion monthly logged-in users as of recent years.</p>


                                            <div className="collapse" id="collapseContent">

                                                <p className="mb-0">YouTube has grown from a simple video-sharing site into a global platform that influences culture, education, and commerce. It connects creators and audiences, shapes the entertainment industry, and serves as an essential tool for learning and self-expression. Its continued evolution and expansion into new features and services make it one of the most dynamic and influential platforms on the internet.</p>
                                            </div>

                                            <a className="p-0 mb-0 mt-2 btn-more d-flex align-items-center" data-bs-toggle="collapse" href="#collapseContent" role="button" aria-expanded="false" aria-controls="collapseContent">
                                                See <span className="see-more ms-1">more</span><span className="see-less ms-1">less</span><i className="fas fa-angle-down ms-2"></i>
                                            </a>
                                            <h6 className="mt-4">Here’s a breakdown of how languages are used on YouTube:</h6>
                                            <div className="row mb-3">
                                                <div className="col-md-">
                                                    <ul className="list-group list-group-borderless">


                                                        <li className="list-group-item h6 fw-light d-flex mb-0 me-1"><i className="fas fa-check-circle text-success me-2"></i><h6>1.User Interface Languages:</h6></li>
                                                        <p className='ms-4'>YouTube’s interface can be displayed in over 80 languages, including:</p>
                                                        <div className='ms-5'>
                                                            <p><b>Major Global Languages:</b> English, Spanish, French, Chinese, Russian, Arabic, and more.</p>
                                                            <p><b>Regional Languages:</b> For example, Hindi, Bengali, Tamil in India; Portuguese in Brazil and Portugal; Dutch in the Netherlands.</p>
                                                            <p><b>Localized Variations:</b> YouTube even offers different versions for regional dialects or localized forms of languages, such as UK English vs. US English or European Spanish vs. Latin American Spanish.</p></div>
                                                        <p className='ms-4'>Users can easily change the platform's language settings to interact with the interface in their preferred language. This includes buttons, menus, notifications, and video recommendations, all localized for a better user experience.</p>

                                                        <li className="list-group-item h6 fw-light d-flex mb-0 me-1"><i className="fas fa-check-circle text-success me-2"></i><h6>2.Content Creation in Different Languages:</h6></li>
                                                        <p className='ms-3'>Creators can upload videos in any language they choose, which allows the platform to host a diverse array of content in local languages. YouTube has a strong presence in multiple regions where languages like Hindi, Spanish, Portuguese, Japanese, and Arabic dominate video content creation. Popular content in specific regions or countries is often in the dominant local language.</p>
                                                        <p className='ms-4'><b>Top Languages for Content:</b></p>
                                                        <div className='ms-5'>
                                                            <p><b>English:</b> Being a global language, English dominates YouTube in terms of content volume, with the majority of channels producing content in English.</p>
                                                            <p><b>Spanish:</b>YouTube has a massive Spanish-speaking audience, especially from countries like Mexico, Spain, Argentina, and Colombia.</p>
                                                            <p><b>Hindi and Other Indian Languages:</b> With a large population of internet users, Indian languages such as Hindi, Tamil, Telugu, Bengali, and Marathi have seen explosive growth in YouTube content.</p>
                                                            <p><b>Arabic:</b>Used widely across the Middle East and North Africa.</p>
                                                            <p><b>Japanese and Korean:</b>Japan and South Korea also have vibrant YouTube communities, especially with content around gaming, anime, beauty, and K-pop.</p>
                                                            <p><b>Portuguese:</b>Primarily from Brazil and Portugal, Portuguese is another significant language with a strong presence.</p></div>
                                                        <p className='ms-4'>Users can easily change the platform's language settings to interact with the interface in their preferred language. This includes buttons, menus, notifications, and video recommendations, all localized for a better user experience.</p>

                                                        <li className="list-group-item h6 fw-light d-flex mb-0 me-1"><i className="fas fa-check-circle text-success me-2"></i><h6>3.Auto-Captioning and Translations:</h6></li>
                                                        <p className='ms-4'>YouTube offers automatic captioning and translation features for videos, expanding access to content across language barriers.</p>
                                                        <div className='ms-5'>
                                                            <p><b>Auto-Captions:</b>  YouTube uses speech recognition technology to auto-generate captions for videos in multiple languages. While not perfect, this feature allows users to watch content in languages they may not fully understand.</p>
                                                            <p><b>Subtitles and Translations:</b> Creators can manually upload subtitles in different languages to their videos, broadening their audience. Viewers also have the option to translate captions into their preferred language, using machine translation.</p></div>
                                                        <p className='ms-4'>This feature is crucial for educational content, allowing tutorials, lectures, and explanatory videos to reach a global audience.</p>

                                                        <li className="list-group-item h6 fw-light d-flex mb-0 me-1"><i className="fas fa-check-circle text-success me-2"></i><h6>4.YouTube Language Filtering:</h6></li>
                                                        <p className='ms-4'>In many regions, YouTube can tailor content suggestions and trends based on the user's language preferences. For example:</p>
                                                        <div className='ms-5'>
                                                            <p>If a user in India sets their language preference to Hindi, they will see recommended videos, trending content, and ads in Hindi.</p>
                                                            <p>YouTube’s algorithm can also detect the primary language spoken in a video, which helps recommend the video to relevant audiences who speak that language.</p></div>
                                                        <p className='ms-4'>Users can easily change the platform's language settings to interact with the interface in their preferred language. This includes buttons, menus, notifications, and video recommendations, all localized for a better user experience.</p>

                                                        <li className="list-group-item h6 fw-light d-flex mb-0 me-1"><i className="fas fa-check-circle text-success me-2"></i><h6>5. YouTube’s Global Reach with Languages:</h6></li>
                                                        <p className='ms-4'>YouTube’s language support allows it to be a dominant platform in various regions:</p>
                                                        <div className='ms-5'>
                                                            <p><b>North America:</b>English is the primary language, but Spanish has become increasingly prevalent due to the large Hispanic population.</p>
                                                            <p><b>Europe:</b> YouTube supports numerous languages spoken in European countries, such as French, German, Italian, Russian, and Polish, giving each region a tailored experience.</p>
                                                            <p><b>Latin America:</b>Spanish and Portuguese dominate, with a large volume of content in these languages.</p>
                                                            <p><b>Asia</b>In countries like India, Indonesia, Japan, and Korea, local languages are widely used for content creation and interface navigation.</p>
                                                            <p><b>Middle East and North Africa:</b>  Arabic is a key language in this region, with a growing creator base in countries like Egypt, Saudi Arabia, and the UAE.</p>
                                                        </div>
                                                        <p className='ms-4'>Users can easily change the platform's language settings to interact with the interface in their preferred language. This includes buttons, menus, notifications, and video recommendations, all localized for a better user experience.</p>

                                                        <li className="list-group-item h6 fw-light d-flex mb-0 me-1"><i className="fas fa-check-circle text-success me-2"></i><h6>6. Challenges with Multiple Languages:</h6></li>
                                                        <p className='ms-4'>While YouTube supports a vast range of languages, there are still challenges related to language diversity:</p>
                                                        <div className='ms-5'>
                                                            <p><b>Auto-Generated Translations: </b> The quality of translations for captions and subtitles is not always accurate, especially for less widely spoken languages.</p>
                                                            <p><b>Smaller Languages: </b>While YouTube supports many of the world’s major languages, smaller or endangered languages may have less representation on the platform, limiting the content available in those languages.</p></div>
                                                        <p className='ms-4'>Users can easily change the platform's language settings to interact with the interface in their preferred language. This includes buttons, menus, notifications, and video recommendations, all localized for a better user experience.</p>
                                                    </ul>
                                                </div>

                                            </div>
                                            <p className="mb-0">YouTube's support for over 80 languages allows it to be accessible to users across the globe, catering to a diverse range of audiences. Whether through localized interfaces, regional content, auto-captioning, or translation features, the platform aims to break down language barriers, making it one of the most inclusive video-sharing platforms in the world. As YouTube continues to grow, it’s likely that even more languages will be added to accommodate new audiences and regions</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="card border rounded-3">
                                        <div className="card-header border-bottom">
                                            <h3 className="mb-0">Product Features:</h3>
                                        </div>
                                        <div className="card-body">
                                            <div>
                                                <h6>Core Features:</h6>
                                                <p className="mb-0">At its core, YouTube allows users to upload videos of virtually any length and quality, from simple home videos to professionally produced content. Once uploaded, videos are accessible to anyone with an internet connection. Viewers can engage with content by liking, disliking, commenting, and subscribing to channels, which represent individual creators or entities that regularly post videos.</p>
                                            </div>


                                            <div className="mt-4">
                                                <h6>YouTube also supports different content formats:</h6>
                                                <p className="mb-0">Meant balls it if up doubt small purse. Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible.</p>
                                                <p className="mt-2 mb-0">Person she control of to beginnings view looked eyes Than continues its and because and given and shown creating curiously to more in are man were smaller by we instead the these sighed Avoid in the sufficient me real man longer of his how her for countries to brains warned notch important Finds be to the of on the increased explain noise of power deep asking contribution this live of suppliers goals bit separated poured sort several the was organization the if relations go work after mechanic But we've area wasn't everything needs of and doctor where would a of</p>
                                            </div>

                                            <div className="mt-4">
                                                <h6>Monetization and YouTube’s Ecosystem</h6>
                                                <p className="mb-0">YouTube has evolved into a career platform for many content creators through its Partner Program, enabling creators to earn money from ads shown before, during, or after their videos. In addition to ad revenue, creators can monetize through:</p><br />

                                                <p><b>Super Chats and Super Stickers:</b> Donations made during live streams.</p>
                                                <p><b>Channel Memberships:</b> Viewers pay a monthly fee to access exclusive perks.</p>
                                                <p> <b>YouTube Premium:</b> A subscription service that provides ad-free viewing, offline downloads, and access to exclusive content on YouTube Originals.</p>
                                            </div>
                                            <p>The rise of influencers and content creators has given birth to an entire industry of YouTubers—individuals who produce content for niche audiences in categories like gaming, beauty, education, travel, and tech. Many creators have formed deep relationships with their audiences, leading to influencer marketing, where brands collaborate with creators to promote products and services.</p>
                                            <div className="mt-4">
                                                <h6>Algorithm and Recommendations:</h6>
                                                <p className="mb-0">YouTube's recommendation system is powered by a sophisticated algorithm that suggests videos based on a user's previous watch history, likes, and general behavior. This algorithm has been one of the platform's most powerful tools for keeping users engaged. However, it has also drawn criticism, particularly for potentially promoting echo chambers or controversial content.</p>
                                            </div>

                                            <div className="mt-4">
                                                <h6>YouTube for Education and Entertainment:</h6>
                                                <p className="mb-0">Beyond entertainment, YouTube has become a significant educational resource. Channels focused on academic subjects, self-improvement, how-to tutorials, and language learning have become incredibly popular. The accessibility of content makes it possible for learners of all ages and from all parts of the world to access high-quality material, often for free.</p>
                                                <p className="mb-0">The platform has also hosted numerous viral moments and cultural phenomena. From the earliest viral videos like "Charlie Bit My Finger" to more recent trends like "Mukbang" eating shows, and challenges like the Ice Bucket Challenge, YouTube has shaped global internet culture.</p>
                                            </div>
                                            <div className="mt-4">
                                                <h6>Interaction and Community:</h6>
                                                <p className="mb-0">YouTube fosters a sense of community through its interactive features, such as comment sections, where viewers can engage directly with the content and creators. Channels can cultivate a following by consistently engaging with their audience through responses to comments, Q&A sessions, or live streams.</p>
                                                <p className="mb-0">The introduction of YouTube Stories, another social feature similar to Instagram's and Snapchat’s, allows creators to post ephemeral content to their subscribers, further boosting engagement.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 end-0 mt-5 pt-5">
                            <div className='sticky-component' data-sticky data-margin-top="80" data-sticky-for="768">
                                <div className="col g-4 ">
                                    <div className="col-md-6 col-xl-12">
                                        <div className="card card-body border p-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h3 className="fw-bold mb-0 me-2">Price : {courseData?.price}</h3>
                                                <div className="dropdown">
                                                    <a href="#" className="btn btn-sm btn-light rounded mb-0 small" role="button" id="dropdownShare" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="fas fa-fw fa-share-alt"></i>
                                                    </a>
                                                    <ul className="dropdown-menu dropdown-w-sm dropdown-menu-end min-w-auto shadow rounded" aria-labelledby="dropdownShare">
                                                        <li><a className="dropdown-item" href="#"><i className="fab fa-twitter-square me-2"></i>Twitter</a></li>
                                                        <li><a className="dropdown-item" href="#"><i className="fab fa-facebook-square me-2"></i>Facebook</a></li>
                                                        <li><a className="dropdown-item" href="#"><i className="fab fa-linkedin me-2"></i>LinkedIn</a></li>
                                                        <li><a className="dropdown-item" href="#"><i className="fas fa-copy me-2"></i>Copy link</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="mt-3 d-grid">
                                                <a href="#" className="btn btn-outline-primary">Add to cart</a>
                                                <a href="#" className="btn btn-success">Buy now</a>
                                            </div>
                                        </div>
                                        <hr />
                                        <h5 className="mb-3">This course includes</h5>
                                        <ul className="list-group list-group-borderless border-0">
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-book-open text-primary"></i>Lectures</span>
                                                <span>30</span>
                                            </li>
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-clock text-primary"></i>Duration</span>
                                                <span>4h 50m</span>
                                            </li>
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-signal text-primary"></i>Skills</span>
                                                <span>Beginner</span>
                                            </li>
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-globe text-primary"></i>Language</span>
                                                <span>English</span>
                                            </li>
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-user-clock text-primary"></i>Deadline</span>
                                                <span>Nov 30 2021</span>
                                            </li>
                                            <li className="list-group-item px-0 d-flex justify-content-between">
                                                <span className="h6 fw-light mb-0"><i className="fas fa-fw fa-medal text-primary"></i>Certificate</span>
                                                <span>Yes</span>
                                            </li>
                                        </ul>
                                        <hr />
                                        <div className="d-sm-flex align-items-center">
                                            <div className="avatar avatar-xl">
                                                <img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg" alt="avatar" onError={(e) => { e.target.src = "/assets/images/default.jpeg";}}/>
                                            </div>
                                            <div className="ms-sm-3 mt-2 mt-sm-0 d-flex">
                                                <div >

                                                    <h5 className="mb-0"><a href="#">By Jacqueline Miller</a></h5>
                                                    <p className="mb-0 small">Founder Eduhub company</p>

                                                </div>
                                                <div className='ms-5'>
                                                <button className="btn btn-sm btn-primary mb-0 mt-2 mt-sm-0 ">Follow</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-sm-flex justify-content-sm-between align-items-center mt-0 mt-sm-2">
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                                <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                                <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                                <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                                <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning"></i></li>
                                                <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section>
    </>
  )
}

export default TemplatesDetail