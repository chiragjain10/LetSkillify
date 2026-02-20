import React, { useEffect } from "react";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../Cart/MainProvider";
import Breadcums from "../Breadcums";
const Products = () => {
  const [visibleCount, setVisibleCount] = useState(2);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  // const [product, setProduct] = useState(Products);
  const { addToWish, handlerAddToWish, product } = useContext(MainContext);

  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (courseId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(courseId)
        ? prevWishlist.filter((id) => id !== courseId)
        : [...prevWishlist, courseId]
    );
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const grid = useRef();

  const [searchItem, setSearchItem] = useState("");
  function handlerSearch(e) {
    setSearchItem(e.target.value);
  }

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  // Handle language filter changes
  const handleLanguageChange = (language) => {
    setSelectedLanguages((prevLanguages) =>
      prevLanguages.includes(language)
        ? prevLanguages.filter((l) => l !== language)
        : [...prevLanguages, language]
    );
  };

  // Filter courses based on search term, selected categories, and selected languages
  const filteredCourses = product?.filter((course) => {
    const matchesSearch =
      course.category.toLowerCase().includes(searchItem.toLowerCase()) ||
      course.title.toLowerCase().includes(searchItem.toLowerCase()) ||
      course.tutor.toLowerCase().includes(searchItem.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);
    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(course.language);

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <>
      <main>
        <Breadcums />

        {/* <section className="bg-dark align-items-center d-flex" style={{
					backgroundImage: 'url(/assets/images/pattern/04.png)',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
					backgroundSize: 'cover'
				}}>
					<div className="container">
						<div className="row">
							<div className="col-12">
								<h1 className="text-white">Product List Classic</h1>
								<div className="d-flex">
									<nav aria-label="breadcrumb">
										<ol className="breadcrumb breadcrumb-dark breadcrumb-dots mb-0">
											<li className="breadcrumb-item"><Link >Home</Link></li>
											<li className="breadcrumb-item active" aria-current="page">Products</li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</section> */}

        <section className="pb-0 py-sm-5">
          <div className="container">
            <div className="row g-3 align-items-center mb-4">
              <div className="col-md-4">
                <h4 className="mb-0">Showing results</h4>
              </div>

              <div className="col-md-8">
                <div className="row g-3 align-items-center justify-content-md-end me-auto">
                  <form className="col-7 col-md-4 col-xl-4 border rounded p-2 input-borderless">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="search"
                      className="w-100 "
                      onInput={handlerSearch}
                    />
                  </form>

                  <div className="col-xl-12 col-3 text-md-end">
                    <button
                      className="btn btn-primary mb-0 d-xl-none"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasSidebar"
                      aria-controls="offcanvasSidebar"
                    >
                      <i className="fas fa-sliders-h me-1"></i> Show filter
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-9 col-xxl-8">
                {
                  <div className="row g-4" ref={grid}>
                    {filteredCourses?.slice(0, visibleCount).map((v, i) => (
                      <div key={v.id}>
                        <div
                          className={`col-12 ${
                            v.category
                              .toLowerCase()
                              .includes(searchItem.toLowerCase()) ||
                            v.title
                              .toLowerCase()
                              .includes(searchItem.toLowerCase())
                              ? "d-initial"
                              : "d-none"
                          }`}
                        >
                          <div className={`card shadow overflow-hidden p-2`}>
                            <div className="row g-0">
                              <div className="col-md-5 overflow-hidden">
                                <img
                                  src={v?.images}
                                  className="rounded-2 h-100 object-fit-cover"
                                  alt="Card image"
                                  onError={(e) => {
                                    e.target.src =
                                      "/assets/images/default.jpeg";
                                  }}
                                />
                                <div className="card-img-overlay">
                                  <div className="ribbon">
                                    <span>Free</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-7">
                                <div className="card-body">
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <Link className="badge text-bg-primary mb-2 mb-sm-0">
                                      {v.category}
                                    </Link>
                                    <div>
                                      <span className="h6 fw-light me-3">
                                        <i className="fas fa-star text-warning me-1"></i>
                                        {v.review}
                                      </span>
                                      <Link
                                        className="text-dark"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          toggleWishlist(v.id);
                                        }}
                                      >
                                        <i
                                          className={
                                            wishlist.includes(v.id)
                                              ? "fas fa-heart text-danger"
                                              : "far fa-heart"
                                          }
                                          onClick={() => handlerAddToWish(v)}
                                        ></i>
                                      </Link>
                                    </div>
                                  </div>

                                  <h5 className="card-title">
                                    <Link
                                      to={`/products/productdetails/${v.id}`}
                                    >
                                      {v.title}
                                    </Link>
                                  </h5>
                                  <p className="text-truncate-2 d-lg-block">
                                    {v.description}
                                  </p>

                                  <ul className="list-inline">
                                    <li className="list-inline-item h6 fw-light mb-1 mb-sm-0">
                                      <i className="fas fa-dollar-sign text-success me-2"></i>
                                      Price : {v.price}
                                    </li>
                                  </ul>

                                  <div className="d-sm-flex justify-content-sm-between align-items-center">
                                    <div className="d-flex align-items-center">
                                      <div className="avatar">
                                        <img
                                          className="avatar-img rounded-circle"
                                          src="/assets/images/avatar/06.jpg"
                                          alt="avatar"
                                          onError={(e) => {
                                            e.target.src =
                                              "/assets/images/default.jpeg";
                                          }}
                                        />
                                      </div>
                                      <p className="mb-0 ms-2">
                                        <Link className="h6 fw-light">
                                          Chirag Jain
                                        </Link>
                                      </p>
                                    </div>
                                    <div className="mt-3 mt-sm-0">
                                      <Link
                                        className="btn btn-dark"
                                        to={`/products/productdetails/${v.id}`}
                                      >
                                        View more
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                }

                {visibleCount < filteredCourses.length && (
                  <div className="col-12">
                    <nav
                      className="mt-4 d-flex justify-content-center"
                      aria-label="navigation"
                    >
                      <ul className="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                        <li className="page-item mb-0">
                          <Link className="page-link" onClick={loadMore}>
                            Load More
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>

              <div className="col-lg-3 col-xxl-4">
                <div
                  className="offcanvas-xl offcanvas-end "
                  tabIndex="-1"
                  id="offcanvasSidebar"
                >
                  <div className="offcanvas-header bg-light">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                      Advance Filter
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      data-bs-target="#offcanvasSidebar"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body p-3 p-xl-0">
                    <form className="w-100">
                      <div className="card card-body shadow p-4 mb-4">
                        <h4 className="mb-4">Category</h4>
                        <div className="row">
                          <div className="col-xxl-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="category1"
                                value="Marketing"
                                onChange={() =>
                                  handleCategoryChange("Marketing")
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="category1"
                              >
                                Marketing
                              </label>
                            </div>
                          </div>
                          <div className="col-xxl-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="category2"
                                value="Finance"
                                onChange={() => handleCategoryChange("Finance")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="category2"
                              >
                                Finance
                              </label>
                            </div>
                          </div>
                          <div className="col-xxl-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="category3"
                                value="Design"
                                onChange={() => handleCategoryChange("Design")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="category3"
                              >
                                Design
                              </label>
                            </div>
                          </div>
                          <div className="col-xxl-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="category4"
                                value="Development"
                                onChange={() =>
                                  handleCategoryChange("Development")
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="category4"
                              >
                                Development
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card card-body shadow p-4 mb-4">
                        <h4 className="mb-4">Languages</h4>
                        <div className="row">
                          <div className="col-xxl-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="language1"
                                value="English"
                                onChange={() => handleLanguageChange("English")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="language1"
                              >
                                English
                              </label>
                            </div>
                          </div>
                          <div className="col-xxl-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="language2"
                                value="Spanish"
                                onChange={() => handleLanguageChange("Spanish")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="language2"
                              >
                                Spanish
                              </label>
                            </div>
                          </div>
                          <div className="col-xxl-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="language3"
                                value="French"
                                onChange={() => handleLanguageChange("French")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="language3"
                              >
                                French
                              </label>
                            </div>
                          </div>
                          <div className="col-xxl-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="language4"
                                value="German"
                                onChange={() => handleLanguageChange("German")}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="language4"
                              >
                                German
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="d-grid p-2 p-xl-0 bg-body text-center">
                    <button className="btn btn-primary mb-0">
                      Filter Results
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container"></div>
      </main>
    </>
  );
};

export default Products;
