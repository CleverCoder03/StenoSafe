"use server"

import { User } from "./models";
import { connectToDB } from "./utils";

const { signIn, signOut } = require("./auth");

export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
  }

  export const handleLogout = async () => {
    "use server";
    await signOut();
  }

export const register = async (formData) => {
  const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData);

  if (password !== passwordRepeat) { return "Password does not match"}

  try {
    connectToDB()

    const user = await User.findOne({username})
    if (user) {
      return "Username Already exists"
    }

    const newUser = new User({
      username,
      email,
      password,
      img
    })

    await newUser.save()
    console.log("Saved to DB")

  } catch (error) {
    console.log(error)
  }
}
