/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';

const slogans = [
    "দফা এক দাবি এক , খুনি হাসিনার পদত্যাগ ☝️✊",
    "আপোষ না সংগ্রাম ? , সংগ্রাম সংগ্রাম ✊",
    "আমার ভাইয়ের রক্ত বৃথা যেতে দেবো না",
    "তোর কোটা তুই নে , আমার ভাইদের ফিরিয়ে দে ",
];

const Typewriter = () => {
    const [currentQuote, setCurrentQuote] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const typewriterEffect = useCallback(() => {
        if (index >= slogans.length) {
            setIndex(0);
            return;
        }

        const quote = slogans[index];

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
            }, 2000); // Adjust pause duration between slogans here

            return () => clearTimeout(timeoutId);
        }
    }, [charIndex, index]);

    useEffect(() => {
        typewriterEffect();
    }, [typewriterEffect]);

    return (
        <h2 className="text-lg lg:text-3xl text-center my-6 text-green-600 font-bold font-[Tiro Bangla]">{currentQuote}</h2>
    );
};

export default Typewriter;
