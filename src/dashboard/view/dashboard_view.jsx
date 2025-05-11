import {
    AppShell,
    Card,
    Text,
    Grid,
    Container,
} from '@mantine/core';

const DashboardView = () => {
    return (
        <AppShell>
            <AppShell.Header>
                <div style={{ padding: '16px', fontWeight: 'bold' }}>Header</div>
            </AppShell.Header>

            <AppShell.Navbar width={{ base: 200 }}>
                <div style={{ padding: '16px' }}>Navbar</div>
            </AppShell.Navbar>

            <AppShell.Footer height={60}>
                <div style={{ padding: '16px' }}>Footer</div>
            </AppShell.Footer>

            <AppShell.Main>
                <Container>
                    <Grid>
                        {[1, 2, 3].map((num) => (
                            <Grid.Col span={4} key={num}>
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Text align="center" size="xl">{num}</Text>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}


export default DashboardView