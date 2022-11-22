import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import AdminPanel from "./routes/adminPanel";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Movies from "./routes/movies";
import Games from "./routes/games";
import Anime from "./routes/anime";
import Other from "./routes/other";
import Product from "./routes/product";
import NavBar from "./components/navBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Register from "./routes/register";
import MyToastComponent from "./components/Toast/MyToastComponent";
import { AxiosInterceptors } from "./services/AxiosInterceptors";
import { useEffect } from "react";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { authStore } from "./stores/auth.store";

AxiosInterceptors();

function App() {

  useEffect(() => {
    authStore.autoLogin();
  }, [authStore]);

  return (
    <div>
      <MyToastComponent />
      <NavBar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie">
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/movies" element={<Movies />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/games" element={<Games />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/other" element={<Other />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
