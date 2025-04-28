# RoomioAI - AI Interior Design Application

## Project Overview
RoomioAI is an innovative web application that uses AI to transform interior spaces. Users can upload photos of their rooms and the app generates redesigned versions in various styles. The application uses Replicate's AI API for generating the designs, Firebase for authentication and database management, and Cloudinary for storing and managing user-uploaded images.

## Tech Stack

### Frontend
- React (with React Router v7)
- Firebase Authentication and Firestore
- CSS for styling
- Vite as build tool
- Axios for API communication

### Backend
- Python with Flask
- Flask-CORS for cross-origin requests
- Replicate API for AI image generation
- Cloudinary for image storage
- dotenv for environment variable management

## Features
- **Authentication**: User signup/login via Google using Firebase
- **Room Redesign**: Upload a room photo and select style/room type
- **Design Generation**: Process images through Replicate's AI API
- **Credit System**: Users get 2 free credits upon registration
- **Pricing Plans**: Different pricing tiers for purchasing additional credits
- **Responsive UI**: Works on both desktop and mobile devices

## Project Structure

### Frontend (`/frontend`)
- `/src/components`: Reusable UI components (Header, DesignForm, etc.)
- `/src/pages`: Main application pages (HomePage, Generate, Login, Pricing)
- `/src/services`: API and authentication services
  - `authentication.js`: Firebase initialization
  - `designService.js`: API calls to backend for image processing
- `/src/styles`: CSS stylesheets for components and pages
- `/src/assets`: Images and other static assets

### Backend (`/backend`)
- `/routes`: API endpoints
  - `generate.py`: Endpoint for generating designs with Replicate
  - `upload.py`: Endpoint for uploading images to Cloudinary
- `/services`: Business logic and external API integration
  - `replicate.py`: Integration with Replicate API
  - `cloudinary_service.py`: Integration with Cloudinary
- `/prompts`: AI prompt templates for Replicate
  - `prompt_templates.py`: Style-specific prompts for the AI
- `/uploads`: Temporary storage for uploaded images

## Data Flow
1. User uploads an image from the frontend (Generate.jsx)
2. Frontend sends image to backend (/api/upload endpoint)
3. Backend uploads image to Cloudinary and returns URL
4. Frontend sends request to /api/generate with Cloudinary URL, style and room type
5. Backend prepares prompt based on selected style and room type
6. Backend sends request to Replicate API with image URL and prompt
7. Replicate processes image and returns URL of generated result
8. Backend returns result URL to frontend
9. Frontend displays result image and decrements user credits in Firestore

## Current Implementation Status

### Working Components
- User authentication via Firebase Google Auth
- Header component showing user info and credits
- DesignForm component for uploading and styling rooms
- Image upload to Cloudinary via backend
- Prompt generation based on style and room type
- Replicate API integration for image generation
- Pricing page with plan options

### To Be Implemented
1. **Credit Deduction**: 
   - Update Firestore when a design is generated
   - Prevent generation if user has no credits

2. **Error Handling**:
   - Better error handling in API calls
   - User-friendly error messages
   - Retry mechanisms for failed API calls

3. **Payment Processing**:
   - Stripe integration for purchasing credits
   - Credit pack selection and checkout flow
   - Receipt/confirmation emails

## To-Do Tasks

### High Priority
- [ ] Implement credit deduction in `Generate.jsx` after successful design generation
```javascript
// In handleSubmit function after successful generation
const db = getFirestore(app);
const userRef = doc(db, "users", user.uid);
await updateDoc(userRef, {
  credits: credits - 1
});
setCredits(credits - 1);
```

- [ ] Add credit validation before generation
```javascript
// In handleSubmit function before generating
if (credits <= 0) {
  setError("You don't have enough credits. Please purchase more.");
  return;
}
```

- [ ] Improve error handling in API calls
- [ ] Add loading states with better UI feedback during processing
- [ ] Implement Stripe checkout for purchasing credit packs

### Medium Priority
- [ ] Create user dashboard to view generation history
- [ ] Add download functionality for generated images
- [ ] Implement email notifications for successful generations
- [ ] Add more style options beyond the current templates
- [ ] Create admin panel for monitoring usage

### Low Priority
- [ ] Implement social sharing features
- [ ] Add user profiles with saved designs
- [ ] Implement A/B testing for conversion optimization
- [ ] Add analytics tracking for user engagement
- [ ] Create a mobile app version

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=AIzaSyAuHIluWG6nBLTG-XUZBPPc2PWlFAtS6q8
VITE_FIREBASE_AUTH_DOMAIN=roomioai.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=roomioai
VITE_FIREBASE_STORAGE_BUCKET=roomioai.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=20135136281
VITE_FIREBASE_APP_ID=1:20135136281:web:92922178fa5241d7c02e88
VITE_FIREBASE_MEASUREMENT_ID=G-MC1XER1KEW
```

### Backend (.env)
```
REPLICATE_API_TOKEN=your_replicate_api_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Development Setup
1. **Frontend**:
   ```
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend**:
   ```
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

## Production Deployment
1. **Frontend**:
   - Build the React app: `npm run build`
   - Deploy to Firebase Hosting or another service

2. **Backend**:
   - Deploy to Heroku, Google Cloud Run, or similar service
   - Set environment variables in the hosting platform
   - Update the frontend VITE_API_URL to point to the production backend

## Notes
- User credits are stored in Firestore under the "users" collection
- Each design generation costs 1 credit
- The free plan gives 2 credits upon signup
- Replicate model used: "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38"
- Currently supported styles: Modern, Scandinavian, Minimalist, Boho, Industrial, Vintage, Coastal, Gaming, Neoclassic, Luxury
