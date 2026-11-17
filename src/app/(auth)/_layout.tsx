import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" options={{ gestureEnabled: true }} />
      <Stack.Screen name="forgot-password" options={{ gestureEnabled: true }} />
    </Stack>
  );
}
