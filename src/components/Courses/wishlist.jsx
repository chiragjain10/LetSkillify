import React from 'react'

useEffect(()=>{
    fetch('https://letskillify.com/backend/api/add-wishlist',{method:'POST', 
      headers:'application/json',
      body: JSON.stringify(wish)
    }).then(resp=>{
      if(!resp.ok) return console.error(resp)
        else resp.json();
    }).then(data => console.log(data,'data send sucessfully')
    ).catch(reas=>{
      console.error(reas)
    })
  })

  
function wishlist() {
    return (
        <>

            <section className="pt-0">
                <div className="container-fluid px-0 mb-3">
                    <div className="card bg-blue h-100px h-md-200px rounded-0" style={{ background: "url(assets/images/pattern/04.png)", backgroundSize: "cover" }}>
                    </div>
                </div>
                <div className="container mt-n4">
                    <div className="row">
                        <div className="col-12">
                            <div className="card bg-transparent card-body pb-0 px-0 mt-2 mt-sm-0">
                                <div className="row d-sm-flex justify-sm-content-between mt-2 mt-md-0">
                                    <div className="col-auto">
                                        <div className="avatar avatar-xxl position-relative mt-n3" style={{width:'150px', height:'150px'}}>
                                            <img className="avatar-img rounded-circle border border-white border-3 shadow" src="assets/images/avatar/09.jpg" alt="" onError={(e) => { e.target.src = "/assets/images/default.jpeg";}}/>
                                            <span className="badge text-bg-success rounded-pill position-absolute top-50 start-100 translate-middle mt-4 mt-md-5 ms-n3 px-md-3">Pro</span>
                                        </div>
                                    </div>
                                    <div className="col d-sm-flex justify-content-between align-items-center">
                                        <div>
                                            <h1 className="my-1 fs-4">Lori Stevens</h1>
                                            <ul className="list-inline mb-0">
                                                <li className="list-inline-item me-3 mb-1 mb-sm-0">
                                                    <span className="h6">255</span>
                                                    <span className="text-body fw-light">points</span>
                                                </li>
                                                <li className="list-inline-item me-3 mb-1 mb-sm-0">
                                                    <span className="h6">7</span>
                                                    <span className="text-body fw-light">Completed courses</span>
                                                </li>
                                                <li className="list-inline-item me-3 mb-1 mb-sm-0">
                                                    <span className="h6">52</span>
                                                    <span className="text-body fw-light">Completed lessons</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="mt-2 mt-sm-0">
                                            <a href="student-course-list.html" className="btn btn-outline-primary mb-0">View my courses</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="d-xl-none" />
                            <div className="col-12 col-xl-3 d-flex justify-content-between align-items-center">
                                <a className="h6 mb-0 fw-bold d-xl-none" href="#">Menu</a>
                                <button className="btn btn-primary d-xl-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                                    <i className="fas fa-sliders-h"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row ">

                    <div className="col-xl-9">

                        <div className="card bg-transparent border rounded-3">
                            <div className="card-header bg-transparent border-bottom">
                                <h3 className="mb-0">WishList</h3>
                            </div>

                            <div className="card-body p-3 p-md-4">
                                <div className="row g-4">
                                    <div className="col-sm-6 col-lg-4">
                                        <div className="card shadow h-100">
                                            <img src="assets/images/courses/4by3/02.jpg" className="card-img-top" alt="course image" onError={(e) => { e.target.src = "/assets/images/default.jpeg";}}/>
                                            <div className="card-body pb-0">
                                                <div className="d-flex justify-content-between mb-2">
                                                    <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                                                    <a href="#" className="text-danger"><i className="fas fa-heart"></i></a>
                                                </div>
                                                <h5 className="card-title fw-normal"><a href="#">Graphic Design Masterclass</a></h5>
                                                <p className="mb-2 text-truncate-2">Rooms oh fully taken by worse do Points afraid but may end Rooms
                                                    Points afraid but may end Rooms</p>
                                                <ul className="list-inline mb-0">
                                                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning"></i></li>
                                                    <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning"></i></li>
                                                    <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                                                </ul>
                                            </div>
                                            <div className="card-footer pt-0 pb-3">
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2"></i>9h 56m</span>
                                                    <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2"></i>65 lectures</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3">
                        <div className="offcanvas-xl offcanvas-end" tabIndex="-1" id="offcanvasSidebar">
                            <div className="offcanvas-header bg-light">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body p-3 p-xl-0">
                                <div className="bg-dark border rounded-3 p-3 w-100">
                                    <div className="list-group list-group-dark list-group-borderless collapse-list">
                                        <a className="list-group-item" href="student-dashboard.html"><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Dashboard</a>
                                        <a className="list-group-item" href="student-subscription.html"><i className="bi bi-card-checklist fa-fw me-2"></i>My Subscriptions</a>
                                        <a className="list-group-item" href="student-course-list.html"><i className="bi bi-basket fa-fw me-2"></i>My Courses</a>
                                        <a className="list-group-item" href="student-course-resume.html"><i className="far fa-fw fa-file-alt me-2"></i>Course Resume</a>
                                        <a className="list-group-item" href="student-quiz.html"><i className="bi bi-question-diamond fa-fw me-2"></i>Quiz</a>
                                        <a className="list-group-item" href="student-payment-info.html"><i className="bi bi-credit-card-2-front fa-fw me-2"></i>Payment Info</a>
                                        <a className="list-group-item active" href="student-bookmark.html"><i className="bi bi-cart-check fa-fw me-2"></i>Wishlist</a>
                                        <a className="list-group-item" href="instructor-edit-profile.html"><i className="bi bi-pencil-square fa-fw me-2"></i>Edit Profile</a>
                                        <a className="list-group-item" href="instructor-setting.html"><i className="bi bi-gear fa-fw me-2"></i>Settings</a>
                                        <a className="list-group-item" href="instructor-delete-account.html"><i className="bi bi-trash fa-fw me-2"></i>Delete Profile</a>
                                        <a className="list-group-item text-danger bg-danger-soft-hover" href="#"><i className="fas fa-sign-out-alt fa-fw me-2"></i>Sign Out</a>
                                        <a className="list-group-item" data-bs-toggle="collapse" href="#collapseauthentication" role="button" aria-expanded="false" aria-controls="collapseauthentication">
                                            <i className="bi bi-lock fa-fw me-2"></i>Dropdown level
                                        </a>
                                        <ul className="nav collapse flex-column" id="collapseauthentication" data-bs-parent="#navbar-sidebar">
                                            <li className="nav-item"> <a className="nav-link" href="#">Dropdown item</a></li>
                                            <li className="nav-item"> <a className="nav-link" href="#">Dropdown item</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default wishlist;
