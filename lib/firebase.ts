import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// Security: Never hardcode API keys. All values must come from environment variables.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate required environment variables
const validateFirebaseConfig = () => {
  const required = ["apiKey", "authDomain", "projectId", "appId"];
  const missing = required.filter((key) => !firebaseConfig[key as keyof typeof firebaseConfig]);
  
  if (missing.length > 0) {
    const varNameMap: Record<string, string> = {
      apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
      authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
      projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
      appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
    };
    const missingVars = missing.map(key => varNameMap[key]).join(", ");
    console.error(
      `❌ Missing Firebase environment variables: ${missingVars}\n` +
      `Please set these in Vercel: Settings → Environment Variables`
    );
    return false;
  }
  return true;
};

// Initialize Firebase only on client side
let app: FirebaseApp | undefined;
let auth: Auth | undefined;

if (typeof window !== "undefined") {
  if (!validateFirebaseConfig()) {
    console.error("Firebase cannot be initialized due to missing configuration");
  } else {
    try {
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
        console.log("✅ Firebase initialized successfully");
      } else {
        app = getApps()[0];
      }
      if (app) {
        auth = getAuth(app);
      }
    } catch (error) {
      console.error("❌ Firebase initialization error:", error);
    }
  }
}

export { auth };
export default app;

