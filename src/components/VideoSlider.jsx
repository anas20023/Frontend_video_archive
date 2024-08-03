/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VideoSlider = ({ videos }) => {
 // console.log('Slider rendered');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '20px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '15px',
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: '10px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: '5px',
        }
      }
    ]
  };

  const handlePlay = (videoId) => {
    localStorage.setItem(`video-watched-${videoId}`, 'true');
  };

  return (
    <div className="container mx-auto overflow-hidden">
      <Slider {...settings}>
        {videos.map((video, index) => {
          const isWatched = localStorage.getItem(`video-watched-${video.id}`) === 'true';

          return (
            <div key={index} className="p-4">
              <div className="relative w-full max-w-screen-xl mx-auto overflow-hidden rounded-lg">
                <video
                  className="w-full h-auto object-cover"
                  controls
                  autoPlay={!isWatched}  // Autoplay if not watched
                  onPlay={() => handlePlay(video.id)}
                >
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center p-2 rounded-t">
                  <p className="text-xs md:text-sm font-semibold">{`${video.title}`}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default VideoSlider;
