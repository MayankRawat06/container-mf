import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Slider.scss";

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Grocery",
    description:
      "Right from fresh Fruits and Vegetables, Rice and Dals, Spices and Seasonings to Packaged products, Beverages, Personal care products, Meats – we have it all.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Electronics",
    description:
      "Shop for electronic products like smartphones, laptops, home appliances, large appliances & more",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Footwear",
    description:
      "Let your attitude have the edge. With a Tuned Air experience that offers premium stability, unbelievable cushioning and classic wavy design lines inspired by nature, the Air Max Plus lets you celebrate your defiant style in comfort.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Home",
    description:
      "Choose from over 100 designs across sofas, beds, mattresses, dining tables, bed linens, utility products, etc.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584116831289-e53912463c35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Fitness",
    description:
      "Your go to nutrition and online supplements store with a wide range of products for health, wellness, fitness & bodybuilding.",
  },
];

function Slider() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect} fade>
      {data.map((slide, i) => {
        return (
          <Carousel.Item className="slider" interval={1000} key={slide.image}>
            <img
              className="d-block w-100 slider-img"
              src={slide.image}
              alt="slider image"
            />
            <Carousel.Caption>
              <h3 className="slider-title display-3">{slide.caption}</h3>
              <p className="slider-caption h4">{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default Slider;
