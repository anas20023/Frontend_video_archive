/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VideoSlider = ({ videos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
  };

  return (
    <div className="container mx-auto rounded">
      <Slider {...settings}>
        {videos.map((video, index) => (
          <div key={index} className="p-4">
            <div className="relative">
              <video width="100%" controls className="block mx-auto min-w-full max-w-lg rounded-md">
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-100 text-white text-center p-2 ro">
                {`Video Title : ${video.title}`}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoSlider;
