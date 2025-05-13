import { Card, Text, Group } from "@mantine/core";

const CustomCard = ({ title, value, color = "white" }) => {
    return (
        <Card
            shadow="md"
            radius="md"
            p="lg"
            withBorder
            style={{
                borderLeft: `4px solid var(--mantine-color-${color}-6)`,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                },
            }}
        >
            <Group justify="space-between" align="center">
                <div>
                    <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                        {title}
                    </Text>
                    <Text size="xl" fw={500}>
                        {value}
                    </Text>
                </div>
                <Text size="xs" c={color} fw={700}>
                    {typeof value === "number" ? `+${value}%` : value}
                </Text>
            </Group>
        </Card>
    );
};

export default CustomCard;