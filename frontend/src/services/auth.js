import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Register a new user with email and password
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {object} profileData - Additional profile data (optional)
 * @returns {Promise} Firebase user credential
 */
export const registerWithEmail = async (email, password, profileData = {}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with additional data if provided
    if (profileData.firstName || profileData.lastName) {
      const displayName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();
      await updateProfile(userCredential.user, {
        displayName
      });
    }
    
    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

/**
 * Sign in with email and password
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Firebase user credential
 */
export const loginWithEmail = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

/**
 * Sign in with Google
 * 
 * @returns {Promise} Firebase user credential
 */
export const loginWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

/**
 * Sign out the current user
 * 
 * @returns {Promise} Void promise
 */
export const logout = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

/**
 * Send password reset email
 * 
 * @param {string} email - User email
 * @returns {Promise} Void promise
 */
export const resetPassword = async (email) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset:", error);
    throw error;
  }
};

/**
 * Listen for authentication state changes
 * 
 * @param {function} callback - Function to call when auth state changes
 * @returns {function} Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      callback(user);
    } else {
      // User is signed out
      callback(null);
    }
  });
};

/**
 * Get the current user
 * 
 * @returns {Object|null} Firebase user or null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Update user profile information
 * 
 * @param {object} profileData - Profile data to update
 * @returns {Promise} Firebase promise
 */
export const updateUserProfile = async (profileData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is signed in');
    
    return await updateProfile(user, profileData);
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

/**
 * Update user email
 * 
 * @param {string} newEmail - New email address
 * @param {string} password - Current password
 * @returns {Promise} Firebase promise
 */
export const updateUserEmail = async (newEmail, password) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is signed in');
    
    // Re-authenticate user before changing email
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    
    return await updateEmail(user, newEmail);
  } catch (error) {
    console.error("Error updating email:", error);
    throw error;
  }
};

/**
 * Update user password
 * 
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} Firebase promise
 */
export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is signed in');
    
    // Re-authenticate user before changing password
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    
    return await updatePassword(user, newPassword);
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

/**
 * Upload user avatar
 * 
 * @param {File} file - Image file to upload
 * @returns {Promise} Firebase promise with download URL
 */
export const uploadUserAvatar = async (file) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user is signed in');
    
    // For a real implementation, you would upload to Firebase Storage
    // But for this demo, we'll use a URL object
    const url = URL.createObjectURL(file);
    
    // Update user profile with the photo URL
    await updateProfile(user, {
      photoURL: url
    });
    
    return url;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};