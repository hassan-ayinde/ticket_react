// import React, { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <>
      <section>
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default Layout;
