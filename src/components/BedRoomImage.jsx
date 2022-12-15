import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const BedRoomImage = ({ image, setShowAllImage }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    lazyLoad: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    infinite: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "none",
        }}
        onClick={onClick}
      />
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "none",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="bedRoomBar">
      <h2>Where you'll sleep</h2>

      <div className="bedss">
        <Slider {...settings}>
          {image?.map((img, idx) => (
            <div
              className="bedg"
              key={idx}
              onClick={() => setShowAllImage(true)}
            >
              <img src={img} alt="bed pics" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BedRoomImage;
