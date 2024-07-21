import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const UploadPage = () => {
    const [image, setImage] = useState(null);
    const [userId, setId] = useState('');
    const location = useLocation();

    console.log(location.state);
    useEffect(() => {
        if (location.state && location.state.id) {
        setId(location.state.id);
        }
    }, [location.state]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('userId', userId);
        console.log('uyfuyvy',userId);
        try {
            const res = await axios.post('/api/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(res.data.msg);
        } catch (err) {
            console.error('Error uploading image:', err);
            alert('Error uploading image');
        }
    };
    

    return (
        <div>
            <h1>Upload Image</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} required />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};


export default UploadPage;