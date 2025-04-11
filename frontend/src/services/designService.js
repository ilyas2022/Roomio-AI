//Aquí defines cómo se comunica tu frontend con el backend Flask

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Sends a request to generate a new room design
 * @param {File} imageFile - The uploaded image file
 * @param {String} style - The selected style (Modern, Industrial, etc.)
 * @param {String} roomType - The selected room type (Living Room, Office, etc.)
 * @returns {Promise} - Promise resolving to the API response object
 */

export const generateDesign = async (imageFile, style, roomType) => {
    try{
        //Step 1: First upload the image to get URL
        const formData = new FormData();
        formData.append('file', imageFile);

        //Assuming you have an endpoint to upload images
        const uploadResponse = await axios.post(`${API_URL}/api/upload`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data',
            },
        });

        const imageUrl = uploadResponse.data.url;

        //Step 2: Send the image URL along with style and room type to generate design
        const response = await axios.post(`${API_URL}/api/generate`,{
            image: imageUrl,
            style: style,
            room: roomType,
        });

        return response.data;
       }catch (error){
        console.error('Error in generateDesign service:', error);
        throw error;
       }

            
    };