import * as SecureStore from 'expo-secure-store';

export async function saveToken(token: string) {
  await SecureStore.setItemAsync('jwt_token', token);
}

export async function getToken() {
  return await SecureStore.getItemAsync('jwt_token');
}

export async function removeToken() {
  await SecureStore.deleteItemAsync('jwt_token');
}

export async function saveId(userId: string) {
    await SecureStore.setItemAsync('user_id', userId);
  }

export async function getId() {
return await SecureStore.getItemAsync('user_id');
}

export async function removeId() {
await SecureStore.deleteItemAsync('user_id');
}

export async function saveEmail(email: string) {
  await SecureStore.setItemAsync('email', email);
}

export async function getEmail() {
  return await SecureStore.getItemAsync('email');
}

export async function removeEmail() {
  await SecureStore.deleteItemAsync('email');
}

export async function saveUsername(username: string) {
  await SecureStore.setItemAsync('username', username);
}

export async function getUsername() {
  return await SecureStore.getItemAsync('username');
}

export async function removeUsername() {
  await SecureStore.deleteItemAsync('username');
}