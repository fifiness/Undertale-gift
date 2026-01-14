import { useEffect, useRef, useState } from 'react';
import './WebcamMirror.css';

const WebcamMirror = () => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const startWebcam = async () => {
            try {
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
                }
            } catch (err) {
                console.error('Error accessing webcam:', err);
                setError('Unable to access webcam. Please grant camera permissions.');
                setLoading(false);
            }
        };

        startWebcam();

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
            {loading && (
                <div className="webcam-loading">
                    <p>* Accessing mirror...</p>
                </div>
            )}

            {error && (
                <div className="webcam-error">
                    <p>* {error}</p>
                </div>
            )}

            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="mirror-video"
            />
        </div>
    );
};

export default WebcamMirror;
