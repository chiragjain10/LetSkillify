import productshop from './ShopJson';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShopCart() {
    const [visibleCount, setvisibleCount] = useState(4)
    const [productType, setProductType] = useState("All");
    const [brand, setBrand] = useState('All');

    const loadMore = () => {
        setvisibleCount(prevCount => prevCount + 4)
    };
    

    useEffect(() => {
        // This will log whenever productType is updated
    }, [productType, brand]);

    function handler(e) {
        setProductType(e.target.value);
        // No need to log here, useEffect will catch the update
    }
    function handler2(e) {
        setBrand(e.target.value);
    }

    return (
        <>
            {/* <section className="py-5">
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            <div className="row mb-4 align-items-center">
                                <div className="col-md-4">
                                    <h5 className="mb-0">All Listed Books</h5>
                                </div>

                                <div className="col-md-4 mt-3 mt-xl-0">
                                    <form className="border-bottom p-2 input-borderless">
                                        <select className="form-select border-0" aria-label="Default select example">
                                            <option value="">Product type</option>
                                            <option>Sillk</option>
                                            <option>Cottan</option>
                                        </select>
                                    </form>
                                </div>

                                <div className="col-md-4 mt-3 mt-xl-0">
                                    <form className="border-bottom p-2 input-borderless">
                                        <select className="form-select border-0" aria-label="Default select example">
                                            <option value="">Select Brand</option>
                                            <option>Handloom</option>
                                            <option>khadi</option>
                                            <option>Linen</option>
                                            <option>Applique</option>
                                           
                                        </select>
                                    </form>
                                </div>
                            </div>

                            <div className="row g-4">
                                {productshop.slice(0, visibleCount).map((shop, index) => (
                                    <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
                                        <div className="card shadow h-100">
                                            <div className="position-relative" style={{
                                                backgroundImage: `url(${shop?.img})`,
                                                backgroundSize: "cover",
                                                height: "300px"
                                            }}>


                                                <div className="card-img-overlay d-flex z-index-0 p-3">
                                                    <div className="w-100 mb-auto d-flex justify-content-end">
                                                        <div className="icon-md bg-dark rounded-circle fs-5">
                                                            <a href="#" className="text-white">
                                                                <i className="bi bi-cart"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-body px-3">
                                                <h5 className="card-title mb-0">
                                                    <a href="shop-product-detail.html" className="stretched-link">{shop?.title}</a>
                                                </h5>
                                                <p className="text-truncate-2">{shop?.description}</p>
                                            </div>

                                            <div className="card-footer pt-0 px-3">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="h6 fw-bold mb-0 fs-5">₹</span>
                                                    <h5 className="text-success mb-0">{shop?.price}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {visibleCount < productshop.length && (
                                    <div className="col-12">
                                        <nav className="mt-4 d-flex justify-content-center" aria-label="navigation">
                                            <ul className="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                                                <li className="page-item mb-0">
                                                    <Link className="page-link" 
                                                    onClick={loadMore}>Load More</Link>
                                                </li>
                                            </ul>
                                        </nav> 
                                    </div>
                                )}

                        </div>
                    </div>
                </div>
            </section>  */}

            <section className="py-5">
                <div className="container">
                    <div className="row">

                        <div className="col-12">
                            <div className="row mb-4 align-items-center">
                                <div className="col-md-4">
                                    <h5 className="mb-0">All Listed Products</h5>
                                </div>

                                <div className="col-md-4 mt-3 mt-xl-0">
                                    <form className="border-bottom p-2 input-borderless">
                                        <select
                                            className="form-select border-0"
                                            aria-label="Product type"
                                            onChange={(e) => handler(e)}
                                        >
                                            <option value="All" selected>All</option>
                                            <option value="Silk">Silk</option>
                                            <option value="Cotton">Cotton</option>
                                            <option value="Geometric">Geometric</option>
                                            <option value="Floral">Floral</option>
                                            <option value="Chanderi">Chanderi</option>
                                            <option value="Kanjivaram">Kanjivaram</option>
                                        </select>
                                    </form>
                                </div>

                                <div className="col-md-4 mt-3 mt-xl-0">
                                    <form className="border-bottom p-2 input-borderless">
                                        <select
                                            className="form-select border-0"
                                            aria-label="Select Brand"
                                            onChange={(e) => handler2(e)}
                                        >
                                            <option value="All" selected>Select Brand</option>
                                            <option value="handloom">Handloom</option>
                                            <option value="khadi">Khadi</option>
                                            <option value="linen">Linen</option>
                                            <option value="applique">Applique</option>
                                        </select>
                                    </form>
                                </div>
                            </div>

                            <div className="row g-4">

                                {productshop.map((shop, index) => (
                                    <div className={`col-sm-6 col-lg-4 col-xl-3 ${((productType === shop.category || productType === 'All') && (brand === shop.subBrand || brand === 'All')) ? 'd-initial' : 'd-none'}`} key={index}>
                                        <div className="card shadow h-100">
                                            <div className="position-relative" style={{
                                                backgroundImage: `url(${shop?.img})`,
                                                backgroundSize: "cover",
                                                height: "300px"
                                            }}>
                                                <div className="card-img-overlay d-flex z-index-0 p-3">
                                                    <div className="w-100 mb-auto d-flex justify-content-end">
                                                        <div className="icon-md bg-dark rounded-circle fs-5">
                                                            <Link to="/cart" className="text-white">
                                                                <i className="bi bi-cart"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body px-3">
                                                <h5 className="card-title mb-0">
                                                    <Link to="/ShopDetail" className="stretched-link">
                                                        {shop?.title}
                                                    </Link>
                                                </h5>
                                                <p className="text-truncate-2">{shop?.description}</p>
                                            </div>
                                            <div className="card-footer pt-0 px-3">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="h6 fw-bold mb-0 fs-5">₹</span>
                                                    <h5 className="text-success mb-0">{shop?.price}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {visibleCount < productshop.length > 5 && (
                                <div className="col-12">
                                    <nav className="mt-4 d-flex justify-content-center" aria-label="navigation">
                                        <ul className="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                                            <li className="page-item mb-0">
                                                <button className="page-link"
                                                 onClick={loadMore}>
                                                    Load More
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ShopCart;
