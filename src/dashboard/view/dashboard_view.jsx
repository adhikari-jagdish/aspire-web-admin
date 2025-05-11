import { AppShell, Card, Text, Grid, Container } from "@mantine/core";
import Header from "../components/header";
import SideNav from "../components/side_nav";
import Footer from "../components/footer";

const DashboardView = () => {
  return (
    <AppShell>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <SideNav />
      </AppShell.Navbar>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>

      <AppShell.Main>
        <Container>
          <Grid>
            {[1, 2, 3].map((num) => (
              <Grid.Col span={4} key={num}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Text align="center" size="xl">
                    {num}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardView;
