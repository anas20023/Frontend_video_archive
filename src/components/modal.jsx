/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const SuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full mx-4 lg:w-1/3">
                <h2 className="text-2xl mb-4">Upload Successful</h2>
                <p className="mb-4">Your video has been uploaded successfully.</p>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const Modal = ({ isOpen, onClose }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [formError, setFormError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    if (!isOpen && !showSuccessModal) return null;

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !title) {
            setFormError('Please provide a title and select a file.');
            return;
        }

        setUploading(true);
        setUploadError('');
        setFormError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('public_id', title);

        try {
            await axios.post('https://backend-images-seven.vercel.app/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setShowSuccessModal(true);
            // Remove this timeout to prevent premature form modal closure
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full mx-4 lg:w-1/2">
                        <h2 className="text-2xl mb-4">Upload Video</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                    Video Title* <span className='text-sm font-normal'>(Mention Place, Date, Time)</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                                    Select file <span className='text-sm font-normal'>(Video only, Max 100 MB)</span>
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            {formError && <p className="text-red-600 mb-4">{formError}</p>}
                            {uploadError && <p className="text-red-600 mb-4">{uploadError}</p>}
                            <div className="flex justify-end">
                                <button type="button" onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded mr-2">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="relative flex items-center bg-blue-600 text-white px-4 py-2 rounded"
                                    disabled={uploading}
                                >
                                    {uploading && (
                                        <svg className="w-5 h-5 text-white animate-spin mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="none" stroke="currentColor" strokeWidth="4" d="M4 12a8 8 0 0 1 16 0"></path>
                                        </svg>
                                    )}
                                    {uploading ? 'Uploading...' : 'Upload'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showSuccessModal && (
                <SuccessModal
                    isOpen={showSuccessModal}
                    onClose={() => {
                        setShowSuccessModal(false);
                        setFile(null); // Clear file input
                        setTitle(''); // Clear title
                        setFormError('');
                        setUploadError('');
                        onClose(); // Close the form modal when success modal is closed
                    }}
                />
            )}
        </>
    );
};

export default Modal;
