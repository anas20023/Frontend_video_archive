/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';

const quotes = [
    "এক দফা এক দাবি , হাসিনা তুই আজই যাবি",
    "জীবন হল যখন আপনি অন্য পরিকল্পনা তৈরির জন্য ব্যস্ত থাকেন।",
    "আমাদের আগামীকালের বাস্তবায়নের একমাত্র সীমা হলো আমাদের আজকের সন্দেহ।",
    "শেষে, আমরা আমাদের শত্রুদের কথা মনে রাখবো না, বরং আমাদের বন্ধুদের নিরবতা মনে রাখবো।",
    "আমাদের জীবনের উদ্দেশ্য হলো সুখী হওয়া।"
];

const Typewriter = () => {
    const [currentQuote, setCurrentQuote] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const typewriterEffect = useCallback(() => {
        if (index >= quotes.length) {
            setIndex(0);
            return;
        }

        const quote = quotes[index];

        if (charIndex < quote.length) {
            const timeoutId = setTimeout(() => {
                setCurrentQuote(prev => prev + quote[charIndex]);
                setCharIndex(prev => prev + 1);
            }, 100); // Adjust typing speed here

            return () => clearTimeout(timeoutId);
        } else {
            const timeoutId = setTimeout(() => {
                setCurrentQuote("");
                setCharIndex(0);
                setIndex(prev => prev + 1);
            }, 2000); // Adjust pause duration between quotes here

            return () => clearTimeout(timeoutId);
        }
    }, [charIndex, index]);

    useEffect(() => {
        typewriterEffect();
    }, [typewriterEffect]);

    return (
        <div className='mt-10 w-full max-w-2xl mx-auto flex justify-center items-center font-[Tiro Bangla]'>
            <h2 className="text-4xl max-w-2xl px-4 text-center">{currentQuote}</h2>
        </div>
    );
};

export default Typewriter;
