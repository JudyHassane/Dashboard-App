import AuthScreen from "../screens/AuthScreen";

export default function RegisterScreen() {
  return (
    <AuthScreen
      mode="register"
      layoutTitle={"Build your own world.\nOne book at a time."}
      layoutSubtitle="Start building your library today!"
      formTitle="Create an account"
      formSubtitle="Join us and build your library"
    />
  );
}
