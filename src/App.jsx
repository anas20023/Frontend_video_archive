import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './index.css';
import VideoSlider from './components/VideoSlider';
import Footer from './components/footer';
import Header from './components/header';
function App() {
  console.log('App rendered');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasLogged = useRef(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log('Fetching videos');
        const response = await axios.get('https://backend-images-seven.vercel.app/api/videos');
        setVideos(response.data);
        console.log('Videos fetched:', response.data);
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
      console.log('Videos:', videos);
      hasLogged.current = true;
    }
  }, [videos]);

  if (loading) return <div className="text-center mt-10">Loading videos...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col justify-between items-center min-h-screen w-full">
      <Header />
      <h1 className='text-3xl text-center my-6 bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent'>দফা এক দাবি এক , খুনি হাসিনার পদত্যাগ ☝️✊</h1>
      <VideoSlider videos={videos} />
      <Footer />
    </div>
  );
}

export default App;
