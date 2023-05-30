export default {
  backendOrigin: "https://www.manhon95.online",
  signUp: "https://www.manhon95.online/auth/sign-up",
  signIn: "https://www.manhon95.online/auth/sign-in",
  getQuestion: (userId: string) =>
    "https://www.manhon95.online/users-questions?user-id=" + userId,
};
