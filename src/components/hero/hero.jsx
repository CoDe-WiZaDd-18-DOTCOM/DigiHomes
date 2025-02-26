import React from "react";
import "./hero.css"
import {HiLocationMarker} from "react-icons/hi"
import CountUp from "react-countup";

const Hero = ()=>{
    return(
        <section className="hero-wrapper">
            <div className="paddings innerWidth flexCenter hero-container">
                <div className="flexColStart left-section">
                    
                    <div className="hero-heading">
                    <div className="orange-circle"/>
                        <h1>
                        Discover <br />
                        Most Suitable <br />
                        Property <br />
                        </h1>
                    </div>
                    <div className="flexColStart hero-description">
                        <span className="secondaryText">Find a variety of properties that suit you very easilty</span>
                        <span className="secondaryText">Forget all difficulties in finding a residence for you</span>
                    </div>
                    <div className="flexCenter search-bar">
                        <HiLocationMarker color="var(--blue)" size={25} />
                        <input type="text" />
                        <button className="button">
                            search
                        </button>
                    </div>
                    <div className="flexCenter numbers">
                        <div className="flexColCenter span1">
                            <div className="num">
                                <CountUp start={8800} end={9000} duration={4} />
                                <span>+</span>
                            </div>
                            <span className="secondaryText">Premium Product</span>
                        </div>
                        <div className="flexColCenter span1">
                            <div className="num">
                                <CountUp start={8800} end={9000} duration={4} />
                                <span>+</span>
                            </div>
                        
                            <span className="secondaryText">Premium Product</span>
                        </div>
                        <div className="flexColCenter span1">
                            <div className="num">
                                <CountUp start={8800} end={9000} duration={4} />
                                <span>+</span>
                            </div>
                            <span className="secondaryText">Premium Product</span>
                        </div>
                    </div>
                </div>

                <div className="flexCenter right-section">
                    {/* <div className="img-container"> */}
                        <img src="./hero-image.png" alt="bulid-img"/>
                    {/* </div> */}
                </div>
            </div>
        </section>
    );
}

export default Hero