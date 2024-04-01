import { useState, useEffect } from 'react';

const Timer = ({ submitExamHandler }) => {
    const [seconds, setSeconds] = useState(10); // in seconds
    const [isCallSubmitHandler, setIsCallSubmitHandler] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    setIsCallSubmitHandler(true)
                    // submitExamHandler(true);         // call happening from here also but not in proper way
                    clearInterval(interval);
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(isCallSubmitHandler) {
            submitExamHandler(true);
        }
    }, [isCallSubmitHandler]);

    const formatTime = (time) => {
        const hr = Math.floor(time / 3600);
        const min = Math.floor((time % 3600) / 60);
        const sec = time % 60;
        return `${hr < 10 ? '0' + hr : hr}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
    };

    return (
        formatTime(seconds)
    );
};

export default Timer;