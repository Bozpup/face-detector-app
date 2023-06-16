import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma3 mt0">
      <Tilt
        className="parallax-effect-glare-scale"
        perspective={2000}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}
      >
        <div
          className="tilt br2 shadow-2"
          style={{
            border: "2px",
            marginTop: "3px",

            marginLeft: "150px",
            width: "250px",
            height: "250px",
          }}
        >
          {/* <h1>React Parallax Tilt 👀👽</h1> */}
          <h1 className="inner-tilt pa3">
            <img
              style={{ paddingTop: "30px", width: "150px", height: "150px" }}
              src={brain}
              alt=""
            />
          </h1>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
