"use server";

import { db } from "@/firebase/client";

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
