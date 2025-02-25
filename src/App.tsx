import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "./contexts/AuthContext";

export default function Index() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}