import './homePage.css'
const homePage=()=>{
    return(
        <>
            <div className="container mt-5">
                {/* section 1 */}
                <div className="row">
                    <div className=" section mb-5">
                        <div className="col-md-4">
                            <h1>Showcase All Your Coding Profile Stats in One Place</h1>
                            <p>Connect friends, track progress, and inspire each other on a unified platform. 
                                <span style={{color:"#FFF"}}>  <b>COD</b></span><span>ERS-UN</span><span style={{color:"#FFF"}}><b>IFIE</b></span><span>D</span>
                            </p>
                        </div>
                        <div className="section1-img col-md-4">
                            <img src="./pic1.png" alt="" />
                        </div>
                    </div>
                    <div className="section ">
                        <div className="section1-img col-md-4">
                            <img src="./pic2.png" alt="" />
                        </div>
                        <div className="col-md-4">
                            <h1>Find Friends, Connect Instantly, Explore Their Profiles</h1>
                            <p>Discover inspiring journeys, stay motivated, and grow together every step of the way.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default homePage