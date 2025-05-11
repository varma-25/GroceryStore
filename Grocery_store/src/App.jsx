import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/header";
import Footer from "./components/footer";

// Lazy Load Pages for Performance Optimization
const Banner = lazy(() => import("./components/banner"));
const Categories = lazy(() => import("./components/categories"));
const StoreItems = lazy(() => import("./components/storeItems"));
const OtherProducts = lazy(() => import("./components/otherProducts"));
const DrinksPage = lazy(() => import("./pages/drinksPage"));
const FruitsPage = lazy(() => import("./pages/fruitsPage"));
const VegetablesPage = lazy(() => import("./pages/vegetablesPage"));
const MeatPage = lazy(() => import("./pages/meatPage"));
const DairyEggsPage = lazy(() => import("./pages/dairyEggsPage"));
const OilsFatsPage = lazy(() => import("./pages/oilsFatsPage"));
const CondimentsPage = lazy(() => import("./pages/condimentsPage"));
const GrainsPage = lazy(() => import("./pages/grainsPage"));
const TeaCoffeePage = lazy(() => import("./pages/teaCoffeePage"));
const SnacksPage = lazy(() => import("./pages/snacksPage"));
const CartPage = lazy(() => import("./pages/cartPage"));

// Admin Panel
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));

// Pages for Login and Signup
const LoginPage = lazy(() => import("./LoginPage"));
const SignupPage = lazy(() => import("./SignupPage"));

// Layout Wrapper
const Layout = ({ children }) => {
  const location = useLocation();

  // Skip Header/Footer on admin page and login/signup pages
  const isAdminPage = location.pathname === "/admin";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAdminPage && !isAuthPage && <Header />}
      {children}
      {!isAdminPage && !isAuthPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Banner />
                    <Categories />
                    <StoreItems />
                    <OtherProducts />
                  </>
                }
              />
              <Route path="/drinks" element={<DrinksPage />} />
              <Route path="/fruits" element={<FruitsPage />} />
              <Route path="/vegetables" element={<VegetablesPage />} />
              <Route path="/meat" element={<MeatPage />} />
              <Route path="/dairy-eggs" element={<DairyEggsPage />} />
              <Route path="/oils-fats" element={<OilsFatsPage />} />
              <Route path="/condiments" element={<CondimentsPage />} />
              <Route path="/grains" element={<GrainsPage />} />
              <Route path="/tea-coffee" element={<TeaCoffeePage />} />
              <Route path="/snacks" element={<SnacksPage />} />
              <Route path="/cart" element={<CartPage />} />

              {/* Admin Panel - no Header/Footer */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Auth Pages */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
        </Layout>
      </Suspense>
    </Router>
  );
}

export default App;
