import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components

// pages
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/404";
import Forms from "./pages/Forms";
import Store from "./pages/Store";
import RestrictedArea from "./pages/RestrictedArea";
import Cart from "./pages/Cart";
import { useState } from "react";

function App() {
  const [cartAmount, setCartAmount] = useState(0);

  const handleSetCartAmount = (amount) => {
    setCartAmount(amount);
  };

  return (
    <main className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/forms/*" element={<Forms />} />
          <Route
            path="/shop"
            element={
              <Store
                handleSetCartAmount={handleSetCartAmount}
                cartAmount={cartAmount}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                handleSetCartAmount={handleSetCartAmount}
                cartAmount={cartAmount}
              />
            }
          />
          <Route path="/restrict" element={<RestrictedArea />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
