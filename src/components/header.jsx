import Time from "./time"
import { useState } from 'react';
import Modal from './modal';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <header className='flex flex-row justify-between items-center mx-auto w-full bg-gradient-to-r from-red-600 to-rose-600'>
            <div className='flex flex-col justify-between items-center mx-auto w-full max-w-4xl text-white px-4 py-5'>
                <h1 className='text-3xl lg:text-4xl font-bold my-4'>বৈষম্য বিরোধী ছাত্র আন্দোলন</h1>
                <h1 className='text-base lg:text-xl'>ভিডিও আর্কাইভ</h1>
                <h1 className='text-sm mt-10 mb-2'>আপনার কাছে থাকা ছাত্রদের উপরে হামলা ও হত্যার ভিডিও আপলোড করুন।</h1>
                <div className='flex flex-row w-3/4 mx-auto justify-around items-center'>
                    <Time />
                    <button
                        className='bg-white px-4 py-2 text-red-600 text-base rounded'
                        onClick={toggleModal}
                    >
                        Upload Video
                    </button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={toggleModal} />
        </header>
    );
};

export default Header;
