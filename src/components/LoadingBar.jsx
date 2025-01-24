/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
// import React from 'react';


import React, { useState, useEffect } from 'react';

function LoadingBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-1 bg-gray-200 relative overflow-hidden">
            <div
                className="h-1 bg-blue-600 absolute left-0 top-0"
                style={{ width: `${progress}%` }}
            ></div>
            <div className="absolute left-0 top-2 text-xs">{progress}%</div>
        </div>
    );
}

export default LoadingBar;
