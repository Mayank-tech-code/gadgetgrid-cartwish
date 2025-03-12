import { lazy, Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../Common/Loader";
import UserContext from "../../contexts/UserContext";

const HomePage = lazy(() => import("../Home/HomePage"));
const ProductsPage = lazy(() => import("../Products/ProductsPage"));
const SingleProductPage = lazy(() =>
  import("../SingleProduct/SingleProductPage")
);
const CartPage = lazy(() => import("../Cart/CartPage"));
const MyOrderPage = lazy(() => import("../MyOrder/MyOrderPage"));
const LoginPage = lazy(() => import("../Authentication/LoginPage"));
const SignupPage = lazy(() => import("../Authentication/SignupPage"));
const Logout = lazy(() => import("../Authentication/Logout"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const ViewProfile = lazy(() => import("../ViewProfile/ViewProfile"));
const ChatbotComponent = lazy(() => import("../AIChat/ChatBot"));

const Routing = () => {
  const user = useContext(UserContext);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chatbot" element={<ChatbotComponent />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/myorders" element={<MyOrderPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<ViewProfile user={user} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routing;
