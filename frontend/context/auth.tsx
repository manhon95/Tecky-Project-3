import { useRouter, useSegments } from "expo-router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

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

type AuthState = { token: string };

const AuthContext = createContext<AuthState | null>(null);

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

export function useToken() {
  const state = useAuth();
  // if (!state) {
  //   throw new Error("not login or forget to wrap with AuthContext Provider?");
  // }
  return state?.token;
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
      router.replace("/QuestionsSetup");
    }
  }, [userToken, segments]);
}

async function loadUserTokenFromStorage(
  setAuth: React.Dispatch<React.SetStateAction<string | null>>
) {
  const token = await getValueFor("userToken");
  setAuth(token);
}

async function setUserTokenFromStorage(
  setAuth: React.Dispatch<React.SetStateAction<string | null>>,
  token: string
) {
  await saveValue("userToken", token);
  setAuth(token);
}

async function deleteUserTokenFromStorage(
  setAuth: React.Dispatch<React.SetStateAction<string | null>>
) {
  await deleteValue("userToken");
  setAuth(null);
}

export function Provider(props: { children: ReactNode }) {
  const [userToken, setAuth] = useState<string | null>(null);
  loadUserTokenFromStorage(setAuth);
  useProtectedRoute(userToken);
  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string) => setUserTokenFromStorage(setAuth, token),
        signOut: () => deleteUserTokenFromStorage(setAuth),
        userToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
