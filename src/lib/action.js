"use server";

import { EncryptedData, User } from "./models";
import { connectToDB } from "./utils";

import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";


export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google");
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDB();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (data) => {
  try {
    connectToDB();

    const { username, password } = data;

    if (!username || !password) {
      return { error: "Username and password are required" };
    }

    const response = await signIn("credentials", { username, password, redirect: false });

    if (response?.error) {
      return { error: "Invalid username or password" };
    }

    return { success: true }; // Indicate success
  } catch (err) {
    console.error("Login Error:", err);

    if (err?.name === "CallbackRouteError") {
      return { error: "Invalid username or password" };
    }

    return { error: "Something went wrong. Please try again." };
  }
};



export const deleteImage = async (imageId) => {
  "use server"; // Ensures it's a server action

  try {
    await connectToDB();
    console.log("Deleting image with ID:", imageId);

    const deletedImage = await EncryptedData.findByIdAndDelete(imageId);
    
    if (!deletedImage) {
      console.log("Image not found");
      return { error: "Image not found" };
    }

    console.log("Image deleted successfully:", deletedImage);
    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { error: "Failed to delete image" };
  }
};