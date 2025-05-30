// hooks/useNotification.js
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconX,
  IconInfoCircle,
  IconAlertTriangle,
} from "@tabler/icons-react";

// Icon with circular background
const IconWithBackground = ({ Icon, bgColor = "#fff", iconColor = "#000" }) => (
  <div
    style={{
      backgroundColor: bgColor,
      borderRadius: "9999px",
      padding: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Icon size={18} color={iconColor} />
  </div>
);

const typeMap = {
  success: {
    color: "#55c669",
    icon: <IconWithBackground Icon={IconCheck} iconColor="#55c669" />,
  },
  error: {
    color: "#fc8181",
    icon: <IconWithBackground Icon={IconX} iconColor="#fc8181" />,
  },
  info: {
    color: "#facc15",
    icon: <IconWithBackground Icon={IconInfoCircle} iconColor="#facc15" />,
  },
  warning: {
    color: "#0ea5e9",
    icon: <IconAlertTriangle Icon={IconX} iconColor="#0ea5e9" />,
  },
};

export function useNotification() {
  const showNotification = ({ type, message, autoClose = 4000 }) => {
    const { color, icon } = typeMap[type] || typeMap.error;

    notifications.show({
      title: type.charAt(0).toUpperCase() + type.slice(1),
      message: message || "No message provided.",
      styles: () => ({
        root: {
          backgroundColor: color, // example
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
        },
        title: {
          color: "#ffffff",
          fontWeight: 600,
        },
        description: {
          color: "#ffffff",
        },
        closeButton: {
          color: "#ffffff",
        },
      }),
      icon,
      autoClose,
      className: "shadow-lg",
    });
  };

  return showNotification;
}
