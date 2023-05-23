export default {
  backendOrigin: "http://13.237.77.71",
  signUp: "http://13.237.77.71/auth/sign-up",
  signIn: "http://13.237.77.71/auth/sign-in",
  getQuestion: (userId: string) =>
    "http://13.237.77.71/users-questions?user-id=" + userId,
};
