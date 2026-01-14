import { useEffect, useRef, useState } from 'react';
import './WebcamMirror.css';

const WebcamMirror = ({ isCompact }) => {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [started, setStarted] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const stopWebcam = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const startWebcam = async () => {
        // Ensure any previous stream is stopped
        stopWebcam();

        try {
            setLoading(true);
            setError(null);
            setCancelled(false);

            // Balanced quality for smooth performance
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280, min: 640 },
                    height: { ideal: 720, min: 480 },
                    facingMode: 'user',
                    frameRate: { ideal: 24, max: 30 }
                },
                audio: false
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;

                // Wait for video to be ready
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().catch(err => {
                        console.error('Error playing video:', err);
                    });
                };

                setLoading(false);
                setStarted(true);
            }
        } catch (err) {
            console.error('Error accessing webcam:', err);

            let errorMessage = 'Unable to access webcam. Please grant camera permissions.';
            if (err.name === 'NotAllowedError') {
                errorMessage = 'Camera permission denied. Please allow camera access.';
            } else if (err.name === 'NotFoundError') {
                errorMessage = 'No camera found. Please connect a camera.';
            } else if (err.name === 'NotReadableError') {
                errorMessage = 'Camera is already in use by another application.';
            }

            setError(errorMessage);
            setLoading(false);
            setStarted(false);
        }
    };

    const handleCancel = () => {
        stopWebcam();
        setCancelled(true);
        setError(null);
        setLoading(false);
        setStarted(false);
    };

    useEffect(() => {
        // Cleanup function to stop webcam when component unmounts
        return () => {
            stopWebcam();
        };
    }, []);

    return (
        <div className={`webcam-mirror ${isCompact ? 'compact' : ''}`}>
            {!started && !loading && !error && !cancelled && (
                <div className="webcam-prompt">
                    <p>* Look into the mirror...</p>
                    <div className="button-group">
                        <button className="start-mirror-btn" onClick={startWebcam}>
                            Start Mirror
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
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
                    <div className="button-group">
                        <button className="retry-btn" onClick={startWebcam}>
                            Try Again
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
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
