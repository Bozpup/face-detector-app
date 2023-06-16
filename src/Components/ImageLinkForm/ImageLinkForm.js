import React from "react";
import "./ImageLinkForm.css";
import ParticlesBg from "particles-bg";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 ma3">
        {"This magic brain will detect faces in your pictures. Give it a try"}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 ph2 white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
        <ParticlesBg type="cobweb" bg={true} />
      </div>
    </div>
  );
};

export default ImageLinkForm;
