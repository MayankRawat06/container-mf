import React from "react";
import About from '../../components/About/About'
import Slider from "../../components/Slider/Slider";
const Home = () => {
  return (
    <div className="home position-relative">
      <Slider />
      <About />
    </div>
  );
};

export default Home;
