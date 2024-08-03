import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './index.css';
import VideoSlider from './components/VideoSlider';
import Footer from './components/footer';
import Header from './components/header';
import Typewriter from './components/typewritter';
function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLogged = useRef(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        //console.log('Fetching videos');
        const response = await axios.get('https://backend-images-seven.vercel.app/api/videos');
        setVideos(response.data);
        // console.log('Videos fetched:', response.data);
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
      //console.log('Videos:', videos);
      hasLogged.current = true;
    }
  }, [videos]);

  if (loading) return <div className="text-center mt-10">Loading videos...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="flex flex-col justify-between items-center min-h-screen w-full">
      <Header />
      <Typewriter />
      <VideoSlider videos={videos} />
      <p className="my-4 text-base text-center text-red-600 font-semibold">ডানে/বামে স্লাইড করুন</p>
      <Footer />
    </div>
  );
}

export default App;
