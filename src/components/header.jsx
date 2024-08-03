/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Time from './time';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => console.log('Cloudinary widget script loaded');
        script.onerror = () => console.error('Failed to load Cloudinary widget script');

        return () => document.body.removeChild(script);
    }, []);

    const handleTitleChange = (event) => setTitle(event.target.value);

    const openUploadWidget = () => {
        if (window.cloudinary) {
            window.cloudinary.openUploadWidget(
                {
                    cloudName: 'dv7sp7pxk',
                    uploadPreset: 'rapzhuij',
                    sources: ['local', 'url', 'camera'],
                    resourceType: 'video',
                    maxFileSize: 100000000,
                    // Temporarily use a placeholder public ID
                    publicId: title,
                },
                (error, result) => {
                    if (error) {
                        console.error('Upload failed:', error);
                        alert('Upload failed. Please try again.');
                        return;
                    }
                    if (result.event === 'success') {
                        console.log('Upload successful:', result.info);
                        // Handle renaming or setting the public ID
                        renameVideo(result.info.public_id);
                        setIsModalOpen(false);
                    }
                }
            );
        } else {
            console.error('Cloudinary widget script not loaded');
            alert('Cloudinary widget is not available. Please try again later.');
        }
    };

    const renameVideo = (currentPublicId) => {
        const newPublicId = title.trim() || currentPublicId;

        fetch(`https://api.cloudinary.com/v1_1/dv7sp7pxk/video/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa('your_api_key:your_api_secret')}`
            },
            body: JSON.stringify({
                public_id: newPublicId,
                overwrite: true,
                resource_type: 'video',
                source: `https://res.cloudinary.com/dv7sp7pxk/video/upload/${currentPublicId}.mp4`
            }),
        })
            .then(response => response.json())
            .then(data => console.log('Video renamed successfully:', data))
            .catch(error => console.error('Error renaming video:', error));
    };

    const handleUploadClick = () => {
        if (title.trim()) {
            openUploadWidget();
        } else {
            alert('Please enter a title before uploading.');
        }
    };

    return (
        <header className='flex flex-col justify-between items-center mx-auto w-full'>
            <div className='flex flex-col justify-between items-center mx-auto w-full max-w-4xl text-white px-4 py-5'>
                <h1 className='text-2xl lg:text-4xl font-bold my-4 p-2 bg-gradient-to-r from-rose-600 to-red-700 bg-clip-text text-transparent'>
                    বৈষম্য বিরোধী ছাত্র আন্দোলন
                </h1>
                <h1 className='text-base lg:text-xl text-slate-800'>ভিডিও আর্কাইভ</h1>
                <h1 className='text-sm text-center mt-10 mb-2 text-slate-600'>
                    আপনার কাছে থাকা ছাত্রদের উপরে হামলা ও হত্যার ভিডিও আপলোড করুন।
                </h1>
                <div className='flex flex-row w-full mx-auto justify-around items-center'>
                    <Time />
                    <button
                        className='text-white px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-base rounded'
                        onClick={() => setIsModalOpen(true)}
                    >
                        Upload Video
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-labelledby="upload-video-modal" aria-modal="true">
                    <div className="bg-white p-6 rounded shadow-lg w-full mx-4 lg:w-1/3">
                        <h2 id="upload-video-modal" className="text-2xl mb-4">Upload Video</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Video Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUploadClick}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
