import AuthScreen from "../screens/AuthScreen";

export default function LoginScreen() {
  return (
    <AuthScreen
      mode="login"
      layoutTitle={
        "Behind every great library\nis a system that keeps it alive."
      }
      layoutSubtitle="Welcome to your Library!"
      formTitle="Welcome back!"
      formSubtitle="Sign in to access your library"
    />
  );
}
