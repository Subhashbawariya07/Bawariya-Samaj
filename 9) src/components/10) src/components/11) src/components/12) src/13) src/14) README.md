# बावरिया समाज (React + Firebase)

## Setup
1) Node.js 18+ इंस्टॉल करें  
2) Dependencies:

npm install

3) Dev run:

npm run dev

4) Build:

npm run build

## Firebase
- Console → Create project
- Authentication → **Phone** और जरूरत हो तो **Email/Password** enable
- Firestore → Enable
- Storage → Enable
- (Web app जोड़ने की जरूरत नहीं — हम SDK से कनेक्ट कर रहे हैं)

## Admin User
- Authentication → Email/Password से एक user बनाओ
- Firestore में `admins/{uid}` डॉक्यूमेंट बना दो (future rules के लिए)

## Deploy (Firebase Hosting)

npm i -g firebase-tools firebase login firebase init   # Hosting चुनें, build folder: dist npm run build firebase deploy

## Note
- Push Notifications बाद में FCM वेब जोड़कर करेंगे।
