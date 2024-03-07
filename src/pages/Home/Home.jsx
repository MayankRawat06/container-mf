import React from "react";
import About from '../../components/About/About'
import Slider from "../../components/Slider/Slider";
import Display from "../../components/Display/Display";
const Home = () => {
  return (
    <div className="home position-relative">
      <Slider />
      <About />
      <Display/>
    </div>
  );
};

export default Home;
