import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
// import coursesData from './productJson'
import { MainContext } from '../Cart/MainProvider';


function ProductsDetail() {
    const { id } = useParams();
    const [productData, setProductData] = useState();
    
    const { product, addToCart, handleAddToCart } = useContext(MainContext);

    useEffect(() => {
        if (product && product.length > 0) {
            const foundProduct = product.find((v) => v.id == id);
            setProductData(foundProduct || null); 
        }
    }, [id, product]); 
    
    if (!productData) {
        return <div>Loading...</div>; 
    }


    

    return (
        <>
            <section className="pt-3 pt-xl-5">
                <div className="container" data-sticky-container>
                    <div className="row g-4">
                        <div className="col-xl-8">
                            <div className="row g-4">
                                <div className="col-12">
                                    <h2>{productData?.title}</h2>
                                    <p>{productData?.description}</p>
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
                                        <img src={productData?.images} alt="" onError={(e) => { e.target.src = "/assets/images/default.jpeg";}}/>

                                    </div>
                                </div>


                                <span dangerouslySetInnerHTML={{ __html: productData?.productDetails }}></span>
                            </div>
                        </div>
                        <div className="col-xl-4 end-0 mt-5 pt-5">
                            <div className='sticky-component' data-sticky data-margin-top="80" data-sticky-for="768">
                                <div className="col g-4 ">
                                    <div className="col-md-6 col-xl-12">
                                        <div className="card card-body border p-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h3 className="fw-bold mb-0 me-2">Price : {productData?.price}</h3>
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
                                                <a href="#" className="btn btn-outline-primary" onClick={() => handleAddToCart(productData)}>Add to cart</a>
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

export default ProductsDetail