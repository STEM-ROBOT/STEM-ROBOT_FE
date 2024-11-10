// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const _apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const _authDomain = import.meta.env.VITE_FIREBASE_AUTHOR_DOMAIN;
const _projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const _storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const _messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const _appId = import.meta.env.VITE_FIREBASE_APP_ID;
const _measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: _apiKey,
  authDomain: _authDomain,
  projectId: _projectId,
  storageBucket: _storageBucket,
  messagingSenderId: _messagingSenderId,
  appId: _appId,
  measurementId: _measurementId,
};

const app = initializeApp(firebaseConfig);
export const imgDB = getStorage(app);

export const FirebaseUpload = async (file) => {
  if (!file) return;
  const imgRef = ref(imgDB, `stem-sever/${v4()}`);

  try {
    // Tải ảnh lên Firebase Storage
    await uploadBytes(imgRef, file, contentType);

    // Lấy URL của ảnh vừa tải lên
    const url = await getDownloadURL(imgRef);
    return url;
    console.log("Image URL:", url);
    // return url;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
export default FirebaseUpload;
