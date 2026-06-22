import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "./layouts/RootLayout";
import AppLayout from "./layouts/AppLayout";
import LoginScreen from "./pages/Auth/screens/LoginScreen";
import RegisterScreen from "./pages/Auth/screens/RegisterScreen";
import NotFoundScreen from "./pages/NotFound/screens/NotFoundScreen";
import Loading from "./components/Loading";
import AuthorsScreen from "./pages/Authors/screens/AuthorsScreen";

const BooksScreen = lazy(() => import("./pages/Books/screens/BooksScreen"));
const BookDetailsScreen = lazy(
  () => import("./pages/Books/screens/BookDetailsScreen"),
);
const DashboardScreen = lazy(
  () => import("./pages/Dashboard/screens/DashboardScreen"),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundScreen />,
    children: [
      {
        path: "login",
        element: <LoginScreen />,
      },
      {
        path: "register",
        element: <RegisterScreen />,
      },
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <DashboardScreen />
              </Suspense>
            ),
          },
          {
            path: "books",
            element: (
              <Suspense fallback={<Loading />}>
                <BooksScreen />
              </Suspense>
            ),
          },
          {
            path: "books/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <BookDetailsScreen />
              </Suspense>
            ),
          },
          {
            path: "authors",
            element: <AuthorsScreen />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
