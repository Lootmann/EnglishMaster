import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="h-screen flex bg-slate-700 text-slate-200">
      <Header />

      <div className="w-full p-2">
        <Outlet />
      </div>
    </div>
  );
}
