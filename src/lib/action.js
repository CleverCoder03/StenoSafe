const { signIn } = require("./auth");

export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
  }