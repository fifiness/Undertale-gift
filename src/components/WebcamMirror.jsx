import { useEffect, useRef, useState } from 'react';
import './WebcamMirror.css';

const WebcamMirror = () => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [started, setStarted] = useState(false);

    const startWebcam = async () => {
        try {
            setLoading(true);
            setError(null);

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    facingMode: 'user'
                },
                audio: false
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setLoading(false);
                setStarted(true);
            }
        } catch (err) {
            console.error('Error accessing webcam:', err);
            setError('Unable to access webcam. Please grant camera permissions.');
            setLoading(false);
            setStarted(false);
        }
    };

    useEffect(() => {
        // Cleanup function to stop webcam when component unmounts
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="webcam-mirror">
            {!started && !loading && !error && (
                <div className="webcam-prompt">
                    <p>* Look into the mirror...</p>
                    <button className="start-mirror-btn" onClick={startWebcam}>
                        Start Mirror
                    </button>
                </div>
            )}

            {loading && (
                <div className="webcam-loading">
                    <p>* Accessing mirror...</p>
                </div>
            )}

            {error && (
                <div className="webcam-error">
                    <p>* {error}</p>
                    <button className="retry-btn" onClick={startWebcam}>
                        Try Again
                    </button>
                </div>
            )}

            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="mirror-video"
                style={{ display: started ? 'block' : 'none' }}
            />
        </div>
    );
};

export default WebcamMirror;
