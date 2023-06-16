import React, { Component } from "react";
import "./App.css";
//import Clarifai from "clarifai";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";

// const app = new Clarifai.App({
//   apiKey: "75340278b7ef4f5e8a66f6abf7ae3f3as",
// });

const MODEL_ID = "face-detection";
// const MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";
const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = "75340278b7ef4f5e8a66f6abf7ae3f3a";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "bozpup";
  const APP_ID = "test";
  // Change these to whatever model and image URL you want to use

  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  };
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    console.log(this.state.input);
    console.log("click");

    // app.models.predict(
    //   {
    //     id: "face-detection",
    //     name: "face-detection",
    //     version: "6dc7e46bc9124c5c8824be4822abe105",
    //     type: "visual-detector",
    //   },
    //   this.state.input
    //   // "https://samples.clarifai.com./face-det.jpg"
    // );
    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        // "/versions/" +
        // MODEL_VERSION_ID,
        "/outputs",
      returnClarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      // .then((result) => console.log("result", result))
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />

            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
