import { createContext, useContext, PropsWithChildren, useState } from 'react';
import { useStorageState } from './useStorageState';
import { useMutation, gql, ApolloError } from '@apollo/client';
import { router } from 'expo-router';
import { removeToken, saveEmail, saveId, saveToken, saveUsername } from './storage';
import { getErrorMessage } from './errorHandler';

const AuthContext = createContext<{
  signIn: (email: string, username: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  userId: number | null;
  email: string | null;
  username: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  login: async () => {},
  signOut: () => {},
  userId: null,
  email: null,
  username: null,
  isLoading: false,
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
  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, username, password) => {
          try {
            const { data } = await signInMutation({ variables: { email, username, password } });
            if (data?.signup) {
              saveToken(data.signup.accessToken)
              setUser({
                userId: data.signup.userId,
                email: data.signup.email,
                username: data.signup.username,
              });
            } else {
              throw new Error("No session received");
            }
          } catch (err) {
            throw getErrorMessage(err);
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
            throw getErrorMessage(err);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

