import React from "react";
import About from '../../components/About/About'
import Slider from "../../components/Slider/Slider";
import Display from "../../components/Display/Display";
import Detail from "../../components/Detail/Detail";
const Home = () => {
  return (
    <div className="home position-relative">
      <Slider />
      <About />
      <Display />
      <Detail />
    </div>
  );
};

export default Home;
