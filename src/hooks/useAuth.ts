import { useAppDispatch, useAppSelector } from "../store/features/hooks";
import { clearError } from "../store/features/auth/slice";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../store/features/auth/api";
import type { RegisterFormData } from "../validationSchemas/register.schema";
import type { LoginFormData } from "../validationSchemas/login.schema";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, authStatus, actionStatus, error } = useAppSelector(
    (state) => state.auth,
  );

  return {
    user,
    authStatus,
    actionStatus,
    error,

    isLoading: actionStatus === "loading",
    isAuthenticated: authStatus === "authenticated",

    login: (data: LoginFormData) => dispatch(loginUser(data)).unwrap(),
    registerAccount: (data: RegisterFormData) =>
      dispatch(registerUser(data)).unwrap(),
    logout: () => dispatch(logoutUser()).unwrap(),
    clearError: () => dispatch(clearError()),
  };
}
