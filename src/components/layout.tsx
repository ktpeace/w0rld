import Nav from "./Nav";
import Footer from "./Footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
