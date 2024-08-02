/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './index.css';
import VideoSlider from './components/VideoSlider';

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLogged = useRef(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://backend-images-seven.vercel.app/api/videos');
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos from backend", error);
        setError('Failed to load videos');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0 && !hasLogged.current) {
      console.log(videos);
      hasLogged.current = true;
    }
  }, [videos]);

  if (loading) {
    return <div className="text-center mt-10">Loading videos...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col justify-between items-center">
      <header className='flex flex-row justify-between items-center mx-auto w-full bg-gradient-to-r from-red-600 to-rose-600'>
        <div className='flex flex-col justify-between items-center mx-auto w-full max-w-4xl text-white p-4'>
          <h1 className='text-3xl lg:text-4xl'>Quota Movement 2024</h1>
          <h1 className='text-base lg:text-xl'>Video Archive</h1>
          <button className='bg-white px-4 py-2 text-red-600 mt-5 text-sm rounded'>Upload Video</button>
        </div>
      </header>
      <main className="flex-grow">
        <VideoSlider videos={videos} />
      </main>
    </div>
  );
}

export default App;
