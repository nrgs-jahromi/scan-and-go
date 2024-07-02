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
import Profile from "../pages/profile/StoreProfile";
import Categories from "../pages/products/categories/CategoriesPage";
import InvoiceList from "../pages/invoices/InvoiceList";
import Signup from "../auth/signup/Signup";
import NumberVerification from "../auth/signup/VerifyNumber";
import StoreInformation from "../pages/storeInfo/StoreInformation";


const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/:token?/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/signup/verify" element={<NumberVerification />} />
        <Route path="/signup/add-store-info/" element={<StoreInformation />} />
        <Route path="/passrecovery/" element={<ForgotPass />} />
        <Route path="/passrecovery/verify" element={<Verification />} />
        <Route path="/passrecovery/setnew/:token?" element={<PassRecovery />} />
        <Route path="/*" element={<MainTemplate />}>
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<CustomerList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/categories" element={<Categories />} />

          <Route path="reports/invoices" element={<InvoiceList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
