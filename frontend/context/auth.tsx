import { useRouter, useSegments } from "expo-router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null as any);

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(userToken: string | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !userToken &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (userToken && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [userToken, segments]);
}

export function Provider(props: { children: ReactNode }) {
  const [userToken, setAuth] = useState<string | null>(null);

  useProtectedRoute(userToken);
  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string) => setAuth(token),
        signOut: () => setAuth(null),
        userToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
