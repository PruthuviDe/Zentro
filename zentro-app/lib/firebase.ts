// ============================================================
// Firebase Analytics Configuration
// Tracks user actions for analytics dashboard
// ============================================================

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAnalytics, logEvent, isSupported, type Analytics } from "firebase/analytics";

// Analytics instance (only available in browser)
let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

/**
 * Lazily initialize Firebase and return the Analytics instance.
 * Returns null in SSR context or when config is unavailable.
 */
async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) return null;

  if (analytics) return analytics;

  // Initialize the Firebase app once
  if (!app) {
    app =
      getApps().length === 0
        ? initializeApp({
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
          })
        : getApps()[0];
  }

  const supported = await isSupported();
  if (supported) {
    analytics = getAnalytics(app);
  }

  return analytics;
}

// ============================================================
// Analytics Event Tracking Functions
// ============================================================

/** Track when a user views the dashboard */
export async function trackDashboardView() {
  const instance = await getAnalyticsInstance();
  if (instance) {
    logEvent(instance, "dashboard_viewed");
  }
}

/** Track when a user creates a new task */
export async function trackTaskCreated() {
  const instance = await getAnalyticsInstance();
  if (instance) {
    logEvent(instance, "task_created");
  }
}

/** Track when a user completes a task */
export async function trackTaskCompleted() {
  const instance = await getAnalyticsInstance();
  if (instance) {
    logEvent(instance, "task_completed");
  }
}

/** Track when a user logs in */
export async function trackUserLogin() {
  const instance = await getAnalyticsInstance();
  if (instance) {
    logEvent(instance, "user_login");
  }
}

/** Track page views with custom page name */
export async function trackPageView(pageName: string) {
  const instance = await getAnalyticsInstance();
  if (instance) {
    logEvent(instance, "page_view", { page_title: pageName });
  }
}
