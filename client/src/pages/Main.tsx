import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiCamera, FiUploadCloud } from "react-icons/fi"; // Icons for UI enhancement

const Main = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const openCamera = () => {
        setIsCameraOpen(true);
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => {
                console.error("Camera error: ", err);
            });
    };

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL();
        setSelectedImage(dataUrl);
        closeCamera();
    };

    const closeCamera = () => {
        setIsCameraOpen(false);
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <Card className="p-8 rounded-2xl shadow-2xl bg-white max-w-sm w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">Upload Profile Picture</h2>
                    <p className="text-sm text-gray-500">Choose an image to upload as your profile picture</p>
                </div>

                <div className="flex flex-col items-center">
                    <div
                        className="w-40 h-40 rounded-full overflow-hidden border-8 border-gray-300 bg-gray-200 mb-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer relative"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Profile Preview"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <FiUploadCloud size={30} className="text-gray-400 mb-2" />
                                <span className="text-gray-500 text-sm">Drag & Drop</span>
                            </div>
                        )}
                    </div>

                    {/* Camera functionality */}
                    {isCameraOpen ? (
                        <div className="text-center">
                            <video ref={videoRef} autoPlay className="w-40 h-40 rounded-full mb-4 shadow-lg"></video>
                            <canvas ref={canvasRef} className="hidden"></canvas>
                            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-2" onClick={capturePhoto}>
                                Capture Photo
                            </Button>
                            <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={closeCamera}>
                                Close Camera
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4 w-full">
                            {/* Upload File Option */}
                            <label className="block w-full">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                />
                                <Button
                                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 flex justify-center items-center space-x-2"
                                >
                                    <FiUploadCloud size={20} />
                                    <span>Upload from Device</span>
                                </Button>
                            </label>

                            {/* Open Camera Option */}
                            <Button
                                onClick={openCamera}
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 flex justify-center items-center space-x-2"
                            >
                                <FiCamera size={20} />
                                <span>Take a Picture</span>
                            </Button>

                            <span className="text-sm text-gray-500">or Drag & Drop to upload</span>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Main;
