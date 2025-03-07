import { createContext, useContext, PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { useMutation, gql } from '@apollo/client';
import { router } from 'expo-router';
import { removeToken, saveEmail, saveId, saveToken, saveUsername } from './storage';

const AuthContext = createContext<{
  signIn: (email: string, username: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}>({
  signIn: async () => {},
  login: async () => {},
  signOut: () => {},
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

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, username, password) => {
          try {
            const { data } = await signInMutation({ variables: { email, username, password } });
            if (data?.signup) {
              saveToken(data.signup.accessToken)
              saveId(data.signup.userId)
              saveEmail(data.signup.email)
              saveUsername(data.signup.username)
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
              saveId(data.login.userId)
              saveEmail(data.login.email)
              saveUsername(data.login.username)
            } else {
              throw new Error("No session received");
            }
          } catch (err) {
            console.error("Login error:", err);
          }
        },
        signOut: () => {
          removeToken()
          router.replace('/sign-in');
        },
        isLoading: signInLoading || loginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

