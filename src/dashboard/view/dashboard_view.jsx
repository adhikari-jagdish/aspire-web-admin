import { AppShell, Card, Text, Grid, Container } from "@mantine/core";
import Header from "../components/header";
import SideNav from "../components/side_nav";
import Footer from "../components/footer";
import HomeView from "./home_view";

const DashboardView = () => {
  const headerHeight = 60;
  const footerHeight = 40;
  return (
    <AppShell
      padding={0}
      navbar={{
        width: { base: 200 }, // Set navbar width (base for all screens)
      }}
      header={{ height: headerHeight }} // Set header height
      footer={{ height: footerHeight }} // Set footer height
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <SideNav />
      </AppShell.Navbar>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>

      <AppShell.Main
        style={{
          paddingTop: headerHeight, // Offset main content by header height
          transition: "padding 0.3s", // Smooth transition for responsive changes
          boxSizing: "border-box",
          minHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`, // Fit viewport
        }}
      >
        <HomeView />
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardView;
