"use server";

import { User } from "./models";
import { connectToDB } from "./utils";

import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
// import toast from "react-hot-toast";
// import * as toast from 'react-hot-toast'

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState,formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    // return "Password does not match";
    // throw new Error("Password does not match");
    return { error: "Password does not match" };
    // toast.error("Password does not match")
  }

  try {
    connectToDB();

    const user = await User.findOne({ username });
    if (user) {
      return { error: "Username Already exists" };
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
    console.log("Saved to DB");
    return {success: true}
  } catch (error) {
    console.log(error);
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")){
      return {error: "Invalid Username or Password"}
    }
    throw err
  }
};
