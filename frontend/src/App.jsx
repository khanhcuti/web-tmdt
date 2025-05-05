import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Profile from "./pages/Profile";
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ManageUsers from './admin/ManageUsers';
import ManageOrders from './admin/ManageOrders';
import ManageProducts from './admin/ManageProducts';

<<<<<<< HEAD
=======

>>>>>>> 4d166ce (test)
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
<<<<<<< HEAD
        <Route path='/place-order' element={<PlaceOrder />} />
=======
        <Route path='/placeorder' element={<PlaceOrder />} />
>>>>>>> 4d166ce (test)
        <Route path='/orders' element={<Orders />} />
        <Route path="/admin/" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/products" element={<ManageProducts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App