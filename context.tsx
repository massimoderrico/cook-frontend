import { createContext, useContext, PropsWithChildren, useState } from 'react';
import { useStorageState } from './useStorageState';
import { useMutation, gql } from '@apollo/client';
import { router } from 'expo-router';
import { removeToken, saveEmail, saveId, saveToken, saveUsername } from './storage';
import { Cookbook, Recipe } from './types/graphql';

const AuthContext = createContext<{
  signIn: (email: string, username: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  userId: number | null;
  email: string | null;
  username: string | null;
  isLoading: boolean;
  selectedCookbook: Cookbook | null;
  setSelectedCookbook: (cookbook: Cookbook) => void;
  selectedRecipe: Recipe | null;
  setSelectedRecipe: (recipe:Recipe) => void;
}>({
  signIn: async () => {},
  login: async () => {},
  signOut: () => {},
  userId: null,
  email: null,
  username: null,
  isLoading: false,
  selectedCookbook: null,
  setSelectedCookbook: () => {},
  selectedRecipe: null,
  setSelectedRecipe: () => {},
});

export function useSession() {
  return useContext(AuthContext);
}

const SIGNIN = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    signup(data: { email: $email, username: $username, password: $password }) {
      accessToken
      userId
      email
    }
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      accessToken
      userId
      email
    }
  }
`;

export function SessionProvider({ children }: PropsWithChildren) {
  const [signInMutation, { loading: signInLoading }] = useMutation(SIGNIN);
  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN);
  const [user, setUser] = useState<{ userId: number; email: string; username: string } | null>(null);
  const [selectedCookbook, setSelectedCookbook] = useState<Cookbook | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, username, password) => {
          try {
            const { data } = await signInMutation({ variables: { email, username, password } });
            if (data?.signup) {
              saveToken(data.signup.accessToken)
              setUser({
                userId: data.login.userId,
                email: data.login.email,
                username: data.login.username,
              });
            } else {
              throw new Error("No session received");
            }
          } catch (err) {
            console.error("Sign-in error:", err);
          }
        },
        login: async (email, password) => {
          try {
            const { data } = await loginMutation({ variables: { email, password } });
            if (data?.login) {
              saveToken(data.login.accessToken)
              setUser({
                userId: data.login.userId,
                email: data.login.email,
                username: data.login.username,
              });
            } else {
              throw new Error("No session received");
            }
          } catch (err) {
            console.error("Login error:", err);
          }
        },
        signOut: () => {
          removeToken()
          setUser(null);
          router.replace('/sign-in');
        },
        userId: user?.userId ?? null,
        email: user?.email ?? null,
        username: user?.username ?? null,
        isLoading: signInLoading || loginLoading,
        selectedCookbook, 
        setSelectedCookbook,
        selectedRecipe, 
        setSelectedRecipe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

