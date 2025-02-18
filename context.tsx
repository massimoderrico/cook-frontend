import { createContext, useContext, PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { useMutation, gql } from '@apollo/client';

const AuthContext = createContext<{
  signIn: (email: string, username: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  userId: number | null;
  email: string | null;
  username: string | null;
  token: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  login: async () => {},
  signOut: () => {},
  userId: null,
  email: null,
  username: null,
  token: null,
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
  const [[isLoading, session], setSession] = useStorageState<{ accessToken: string; userId: number; email: string; username: string } | null>("session");
  
  const [signInMutation, { loading: signInLoading }] = useMutation(SIGNIN);
  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, username, password) => {
          try {
            const { data } = await signInMutation({ variables: { email, username, password } });
            if (data?.signup) {
              setSession({
                accessToken: data.signup.accessToken,
                userId: data.signup.userId,
                email: data.signup.email,
                username: username 
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
              setSession({
                accessToken: data.login.accessToken,
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
          setSession(null);
        },
        userId: session?.userId ?? null,
        email: session?.email ?? null,
        username: session?.username ?? null,
        token: session?.accessToken ?? null,
        isLoading: isLoading || signInLoading || loginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

