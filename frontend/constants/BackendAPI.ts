export default {
  backendOrigin: "http://3.104.136.222",
  signUp: "http://3.104.136.222/auth/sign-up",
  signIn: "http://3.104.136.222/auth/sign-in",
  getQuestion: (userId: string) =>
    "http://3.104.136.222/users-questions?user-id=" + userId,
};
