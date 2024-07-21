import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useLocation } from 'react-router-dom';


const DisplayImagesPage = () => {
    const [userId, setId] = useState('');
    const location = useLocation();

    console.log(location.state);
    useEffect(() => {
        if (location.state && location.state.id) {
        setId(location.state.id);
        }
    }, [location.state]);

    return (
        <div>
            <h1>Uploaded Images</h1>
            <div>
                console.log(userId);
                <img 
                    src={`/api/images/get/${userId}`} 
                    alt="Uploaded"
                    style={{ width: '300px' }} 
                />
            </div>
        </div>
    );
};

export default DisplayImagesPage;
