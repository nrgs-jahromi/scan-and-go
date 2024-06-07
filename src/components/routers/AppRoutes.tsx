import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FC } from "react";
import Login from "../auth/Login";
import ForgotPass from "../auth/ForgotPass";
import PassRecovery from "../auth/PassRecovery";
import Dashboard from "../dashboard/Dashboard";
import MainTemplate from "../mainTemplate/MainTemplate";
import Verification from "../auth/VerifyEmail";

import CustomerList from "../pages/customers/list/CustomerList";
import AddProduct from "../pages/products/AddProduct";


const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/:token?/" element={<Login />} />
        <Route path="/passrecovery/" element={<ForgotPass />} />
        <Route path="/passrecovery/verify" element={<Verification />} />
        <Route path="/passrecovery/setnew/:token?" element={<PassRecovery />} />
        <Route path="/*" element={<MainTemplate />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<CustomerList />} />
          <Route path="products/add" element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
