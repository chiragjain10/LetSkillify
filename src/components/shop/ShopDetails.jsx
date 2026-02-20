import React from 'react'
import ShopJson from './ShopJson.jsx'

function ShopDetails() {
    return (
        <>

            <section className="pt-5">
                <div className="container" data-sticky-container>
                    <div className="row g-4 g-sm-5">


                        <div className="col-xl-4">
                            <div data-sticky data-margin-top="80" data-sticky-for="992">
                                <div className="row justify-content-center">
                                    <div className="col-md-8 col-xl-12">


                                        <div className="card shadow">

                                            <div className="rounded-3">
                                                <img src="assets/images/book/01.jpg" className="card-img-top" alt="book image" onError={(e) => { e.target.src = "/assets/images/default.jpeg";}}/>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>


                        <span dangerouslySetInnerHTML={{ __html: ShopJson.details }}></span>

                    </div>
                </div>


            </section >

        </>
    )
}

export default ShopDetails