import React, { useEffect, useState } from 'react';
import './CountdownPopup.css';

const CountdownPopup = ({ onComplete }) => {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        let timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        // When countdown reaches 0, we trigger the onComplete callback and clear the interval
        if (countdown === 0) {
            clearInterval(timer);
            onComplete();
        }

        return () => clearInterval(timer); // Cleanup the interval
    }, [countdown, onComplete]);

    return (
        <div className="popup-count-overlay">
            <div className="popup-count-content">
               {/* <h2>Hệ thống đang xử lý...</h2> */}
                <h2>DƯƠNG ĐẸP TRAI ĐÃ XỬ LÝ..</h2>
                <p>{countdown}</p>
            </div>
        </div>
    );
};

export default CountdownPopup;
