import AuthLayout from "../../../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";
import type { AuthScreenProps } from "../../../types";

export default function AuthScreen({
  mode,
  layoutTitle,
  layoutSubtitle,
  formTitle,
  formSubtitle,
}: AuthScreenProps) {
  return (
    <AuthLayout title={layoutTitle} subtitle={layoutSubtitle}>
      <AuthForm mode={mode} title={formTitle} subtitle={formSubtitle} />
    </AuthLayout>
  );
}
