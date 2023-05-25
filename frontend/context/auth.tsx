import { useRouter, useSegments } from "expo-router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

type User = {
  id: string;
  token: string;
};

type AuthState = {
  signIn: (token: string, id: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthState | null>(null);

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/QuestionsSetup");
    }
  }, [!user, segments[0], router]);
}

export function Provider(props: { children: ReactNode }) {
  const [user, setAuth] = useState<User | null>(null);
  useEffect(() => {
    loadUserTokenFromStorage(setAuth);
  }, []);
  useProtectedRoute(user);
  const value = {
    signIn: (token: string, id: string) =>
      setUserTokenFromStorage(setAuth, token, id),
    signOut: () => deleteUserTokenFromStorage(setAuth),
    user,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

async function saveValue(key: string, value: string) {
  Platform.OS === "web"
    ? await AsyncStorage.setItem(key, value)
    : await SecureStore.setItemAsync(key, value);
}

async function deleteValue(key: string) {
  Platform.OS === "web"
    ? await AsyncStorage.removeItem(key)
    : await SecureStore.deleteItemAsync(key);
}

async function getValueFor(key: string) {
  const result =
    Platform.OS === "web"
      ? await AsyncStorage.getItem(key)
      : await SecureStore.getItemAsync(key);
  return result;
}

async function loadUserTokenFromStorage(
  setAuth: Dispatch<SetStateAction<User | null>>
) {
  const token = await getValueFor("userToken");
  const id = await getValueFor("userId");
  if (token && id) setAuth({ token, id });
}

async function setUserTokenFromStorage(
  setAuth: Dispatch<SetStateAction<User | null>>,
  token: string,
  id: string
) {
  await saveValue("userToken", token);
  await saveValue("userId", id);
  setAuth({ token, id });
}

async function deleteUserTokenFromStorage(
  setAuth: Dispatch<SetStateAction<User | null>>
) {
  await deleteValue("userToken");
  await deleteValue("userId");
  setAuth(null);
}
