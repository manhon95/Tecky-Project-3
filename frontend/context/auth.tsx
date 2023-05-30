import { SplashScreen, useRouter, useSegments } from "expo-router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useReducer,
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
  loading: boolean;
};

type AuthAction = {
  type: string;
  token?: string;
  id?: string;
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  if (action.type === "sign-in" && action.token && action.id) {
    return {
      ...state,
      user: { token: action.token, id: action.id },
      loading: false,
    };
  }
  if (action.type === "sign-out") {
    return { ...state, user: null, loading: false };
  }
  throw Error("Unknown action.");
}

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
  // const [user, setAuth] = useState<User | null>(null);
  const [authState, authDispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
    signIn: (token: string, id: string) =>
      setUserTokenFromStorage(authDispatch, token, id),
    signOut: () => deleteUserTokenFromStorage(authDispatch),
  });
  console.log(authState);
  useEffect(() => {
    loadUserTokenFromStorage(authDispatch);
  }, []);
  useProtectedRoute(authState.user);
  return (
    <AuthContext.Provider value={authState}>
      {authState.loading && <SplashScreen />}
      {!authState.loading && props.children}
    </AuthContext.Provider>
  );
}

async function saveValue(key: string, value: string): Promise<void> {
  Platform.OS === "web"
    ? await AsyncStorage.setItem(key, value)
    : await SecureStore.setItemAsync(key, value);
}

async function deleteValue(key: string): Promise<void> {
  Platform.OS === "web"
    ? await AsyncStorage.removeItem(key)
    : await SecureStore.deleteItemAsync(key);
}

async function getValueFor(key: string): Promise<string | null> {
  const result =
    Platform.OS === "web"
      ? await AsyncStorage.getItem(key)
      : await SecureStore.getItemAsync(key);
  return result;
}

async function loadUserTokenFromStorage(
  authDispatch: Dispatch<SetStateAction<AuthAction>>
): Promise<void> {
  const token = await getValueFor("userToken");
  const id = await getValueFor("userId");
  token && id
    ? authDispatch({ type: "sign-in", token, id })
    : authDispatch({ type: "sign-out" });
}

async function setUserTokenFromStorage(
  authDispatch: Dispatch<SetStateAction<AuthAction>>,
  token: string,
  id: string
): Promise<void> {
  await saveValue("userToken", token);
  await saveValue("userId", id);
  authDispatch({ type: "sign-in", token, id });
}

async function deleteUserTokenFromStorage(
  authDispatch: Dispatch<SetStateAction<AuthAction>>
): Promise<void> {
  await deleteValue("userToken");
  await deleteValue("userId");
  authDispatch({ type: "sign-out" });
}
