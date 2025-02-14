import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar";
import InnerNavbar from "../components/InnerNavbar/InnerNavbar";
import Sidebar from "../components/Sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar user={{ name: "John Doe", profilePic: "/user-profile.jpg", isOnline: true }} />
        <div style={{ flex: 1, marginLeft: "80px" }}>
          <DashboardNavbar />
          <div style={{ display: "flex" }}>
            <InnerNavbar />
            <main style={{ flex: 1, padding: "80px 20px 20px 20px" }}>{children}</main>
          </div>
        </div>
      </div>
    );
  }