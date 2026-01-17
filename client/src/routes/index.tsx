import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import { ROUTES } from "./routes.constant";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<MainLayout />}>
        <Route index element={<Home></Home>}></Route>
      </Route>
      <Route path={ROUTES.LOGIN} element={<Login></Login>}></Route>
      <Route path={ROUTES.REGISTER} element={<Register></Register>}></Route>
    </Routes>
  );
}
