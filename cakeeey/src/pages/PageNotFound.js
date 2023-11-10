// import react router stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function PageNotFound() {


    return (
        <section className="py-20" style={{ minHeight: "700px" }} >
            <div style={{ height: "50px" }}></div>
            <div className="position-relative container">
                <div className="position-relative mw-4xl mx-auto">
                    <div className="position-absolute top-50 start-0 end-0 translate-middle-y ms-n6 me-n6" ></div>
                    <div className="position-relative py-16 pt-md-32 pb-md-20 px-4 px-sm-8 bg-white">
                        <div className="mw-lg mx-auto text-center">
                            <div className="d-inline-block h6 mb-14" href="#">

                            </div>
                            <h2>Oh no. Page not found!</h2>
                            <Link to="/">
                                <img
                                    src="/images/withered.png"
                                height="300px"
                                // width="110px"
                                ></img>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="mw-lg mx-auto text-center">
                <div className="d-inline-block h2 mb-14">
                    <div className="logoPosition py-3 increaseHover2">
                        <div>Oh no. Page not found!</div>
                        <Link to="/">
                            <img
                                src="/images/withered.png"
                                // height="110px"
                                // width="110px"
                            ></img>
                        </Link>
                    </div>
                </div>
            </div> */}
        </section>

    );

}