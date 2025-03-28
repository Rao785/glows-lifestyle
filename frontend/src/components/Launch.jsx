import React, { useState, useEffect } from 'react';
import {  FaClock, } from 'react-icons/fa'; // Font Awesome
import { FiGift } from "react-icons/fi";







export default function WelcomePage() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Launch date: April 4, 2025
    const launchDate = new Date('2025-04-04T00:00:00').getTime();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });

            if (distance < 0) {
                clearInterval(timer);
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
            setSubscribed(true);
            // In a real application, you'd send this to your backend
            console.log('Subscribed email:', email);
        }
    };

    const CountdownBlock = ({ value, label, className }) => (
        <div className={`flex flex-col items-center border-2 border-white text-white rounded-lg shadow-lg ${className}`}>
            <span className="font-bold">{value}</span>
            <span className="text-sm">{label}</span>
        </div>
    );


    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-6 overflow-hidden">
            {/* Floating background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute animate-pulse top-10 left-10 w-24 h-24 bg-white rounded-full"></div>
                <div className="absolute animate-bounce top-1/4 right-1/4 w-16 h-16 bg-white rounded-full"></div>
                <div className="absolute animate-spin-slow bottom-1/4 left-1/3 w-32 h-32 border-4 border-white rounded-full"></div>
            </div>
            {/* Main content */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <FiGift className="mx-auto mb-6 w-24 h-24 text-white animate-bounce" />

                <h1 className="text-4xl text-red-600 md:text-6xl font-bold mb-4 animate-fade-in">
                    Something Incredible is Coming
                </h1>

                <p className="text-lg md:text-xl opacity-90  mb-8 max-w-2xl mx-auto">
                    Get ready for a groundbreaking experience. We're working hard to bring you something truly special.
                </p>

                {/* Countdown Timer */}
                <div className="flex justify-center items-center mb-8">
                    <FaClock className="mr-4 text-white" size={52} />
                    <div className="flex space-x-4">
                        <CountdownBlock value={countdown.days} label="Days" className="text-4xl p-6 w-24" />
                        <CountdownBlock value={countdown.hours} label="Hours" className="text-4xl p-6 w-24" />
                        <CountdownBlock value={countdown.minutes} label="Minutes" className="text-4xl p-6 w-24" />
                        <CountdownBlock value={countdown.seconds} label="Seconds" className="text-4xl p-6 w-24" />
                    </div>

                </div>



                <p className="mt-8 text-sm opacity-70">
                    Launching on 4-4-2025 • Stay Excited!
                </p>
            </div>
        </div>
    );
}