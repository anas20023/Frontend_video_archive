/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Time from './time';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        // Pre-load the Cloudinary widget script
        const script = document.createElement('script');
        script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
            console.log('Cloudinary widget script loaded');
        };

        return () => {
            // Cleanup script on component unmount
            document.body.removeChild(script);
        };
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const toggleModal = () => {
        if (!isModalOpen) {
            openUploadWidget();
        }
        setIsModalOpen(!isModalOpen);
    };

    const openUploadWidget = () => {
        if (window.cloudinary) {
            window.cloudinary.openUploadWidget(
                {
                    cloudName: 'dv7sp7pxk', // Replace with your Cloudinary cloud name
                    uploadPreset: 'rapzhuij', // Replace with your upload preset
                    sources: ['local', 'url', 'camera'],
                    resourceType: 'video',
                    maxFileSize: 100000000, // 100 MB
                    context: { title: title } // Pass the title as metadata
                },
                (error, result) => {
                    if (error) {
                        console.error('Upload failed:', error);
                        return;
                    }
                    if (result.event === 'success') {
                        console.log('Upload successful:', result.info);
                        // Handle the successful upload, e.g., show a success message or update the state
                        setIsModalOpen(false);
                    }
                }
            );
        } else {
            console.error('Cloudinary widget script not loaded');
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
                <div className='flex flex-col sm:flex-row w-full mx-auto justify-around items-center'>
                    <Time />
                    <div className='mt-4 sm:mt-0'>
                        <input
                            type='text'
                            value={title}
                            onChange={handleTitleChange}
                            placeholder='Enter video title'
                            className='mb-4 sm:mb-0 p-2 border rounded'
                        />
                    </div>
                    <button
                        className='text-white px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-base rounded'
                        onClick={toggleModal}
                    >
                        Upload Video
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
