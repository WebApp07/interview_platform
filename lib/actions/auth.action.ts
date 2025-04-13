"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 7 days

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecored = await db.collection("users").doc(uid).get();

    if (userRecored.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }
  } catch (error: any) {
    console.error("Error creating a user", error);

    if (error.code == "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use.",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });
  }

  return {
    success: false,
    message: "Failed to create an account.",
  };
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecored = await auth.getUserByEmail(email);
    if (!userRecored) {
      return {
        success: false,
        message: "User does not exist. Please Create an account instead.",
      };
    }

    await setSessionCookie(idToken);
  } catch (e) {
    console.error("Error signing in", e);
    return {
      success: false,
      message: "Failed to log into an account.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth().createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // 7 days
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
