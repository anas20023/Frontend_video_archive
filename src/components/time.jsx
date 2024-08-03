import { useState, useEffect } from 'react';

const Time = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const updateTime = () => setTime(new Date());

        // Update time every second
        const intervalId = setInterval(updateTime, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const date = time.getDate();
    let month = time.toLocaleString('default', { month: 'long' });

    // Custom logic to show the previous month if the current month is August
    if (time.getMonth() === 7) { // August is month 7 (0-indexed)
        month = new Date(time.setMonth(time.getMonth() - 1)).toLocaleString('default', { month: 'long' });
    }

    // Get hours, minutes, and seconds
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return (
        <h1 className="font-bold text-base bg-white px-4 py-2 rounded text-red-600">
            {date + 31} {month}  {hours}:{minutes}:{seconds}
        </h1>
    );
}

export default Time;
