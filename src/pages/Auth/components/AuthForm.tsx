import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import AuthInput from "./AuthInput";
import { authStyles } from "../../../styles/authStyles";
import { useAuth } from "../hooks/useAuth";

import {
  registerSchema,
  type RegisterFormData,
} from "../../../validationSchemas/register.schema";

import {
  loginSchema,
  type LoginFormData,
} from "../../../validationSchemas/login.schema";

import { toast } from "react-toastify";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
  title: string;
  subtitle: string;
}

type AuthFormData = RegisterFormData | LoginFormData;

export default function AuthForm({ mode, title, subtitle }: AuthFormProps) {
  const isRegister = mode === "register";

  const { login, registerAccount, clearError, isLoading } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
    try {
      if (isRegister) {
        await registerAccount(data as RegisterFormData);
        toast.success("Registration successful!");
      } else {
        await login(data as LoginFormData);
        toast.success("Successfully logged in!");
      }

      navigate("/");
    } catch {
      //
    }
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className={authStyles.form.passwordToggle}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  const confirmPasswordToggle = (
    <button
      type="button"
      onClick={() => setShowConfirmPassword((prev) => !prev)}
      className={authStyles.form.passwordToggle}
      aria-label={
        showConfirmPassword ? "Hide confirm password" : "Show confirm password"
      }
    >
      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <div>
      <div className={authStyles.form.header}>
        <h2 className={authStyles.form.title}>{title}</h2>
        <p className={authStyles.form.subtitle}>{subtitle}</p>
      </div>

      <form
        className={authStyles.form.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={authStyles.form.fieldsWrapper}>
          {isRegister && (
            <AuthInput
              id="name"
              type="text"
              label="Full Name"
              error={"name" in errors ? errors.name?.message : undefined}
              startIcon={<User size={18} />}
              inputProps={register("name")}
            />
          )}

          <AuthInput
            id="email"
            type="email"
            label="Email Address"
            error={errors.email?.message}
            startIcon={<Mail size={18} />}
            inputProps={register("email")}
          />

          <AuthInput
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            error={errors.password?.message}
            startIcon={<Lock size={18} />}
            inputProps={register("password")}
            endIcon={passwordToggle}
          />

          {isRegister && (
            <AuthInput
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              error={
                "confirmPassword" in errors
                  ? errors.confirmPassword?.message
                  : undefined
              }
              startIcon={<Lock size={18} />}
              inputProps={register("confirmPassword")}
              endIcon={confirmPasswordToggle}
            />
          )}
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading || isSubmitting}
          sx={{
            py: 1.5,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.938rem",
          }}
        >
          {isLoading || isSubmitting ? (
            <CircularProgress size={22} color="inherit" />
          ) : isRegister ? (
            "Create Account"
          ) : (
            "Sign in"
          )}
        </Button>

        <div className={authStyles.form.footer}>
          <p className={authStyles.form.footerText}>
            {isRegister
              ? "Already have an account? "
              : "Don't have an account? "}

            <Link
              to={isRegister ? "/login" : "/register"}
              className={authStyles.form.link}
            >
              {isRegister ? "Sign in" : "Create one"}
            </Link>
          </p>
        </div>

        {isRegister && (
          <div className={authStyles.form.infoBox}>
            By creating an account, you agree to our{" "}
            <span className={authStyles.form.termsText}>Terms of Service</span>
          </div>
        )}
      </form>
    </div>
  );
}
