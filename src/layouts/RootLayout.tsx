import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../store/features/hooks";
import { getCurrentUser } from "../store/features/auth/api";

export default function RootLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Outlet />
      <ToastContainer position="bottom-right" />
    </>
  );
}
