import { Outlet } from "react-router";
import { BrowserMockup } from "./BrowserMockup";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Annotation } from "../ui/Annotation";

export function Root() {
  return (
    <BrowserMockup>
      <div className="relative flex min-h-screen flex-col bg-[#F8FAFC] transition-colors dark:bg-gray-800 md:h-full md:min-h-0 md:flex-row">
        <Annotation number={1} label="Sidebar Navigation – Navigate between Dashboard, Roadmap, Resources, and Admin" position="top-left" />
        <Sidebar />
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <Annotation number={2} label="Header Bar – User profile and theme toggle" position="top-right" />
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </BrowserMockup>
  );
}
