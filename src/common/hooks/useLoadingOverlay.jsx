import { useState } from "react";
import { LoadingOverlay } from "@mantine/core";

// Custom hook for managing loading overlay
const useLoadingOverlay = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Function to show loading overlay
  const showLoading = () => setIsLoading(true);

  // Function to hide loading overlay
  const hideLoading = () => setIsLoading(false);

  // Toggle loading state
  const toggleLoading = () => setIsLoading((prev) => !prev);

  // Component to render the loading overlay
  const LoadingOverlayComponent = ({ visible = isLoading, ...props }) => (
    <LoadingOverlay
      visible={visible}
      zIndex={1000}
      overlayProps={{ radius: "sm", blur: 2 }}
      loaderProps={{ color: "blue", type: "bars" }}
      {...props}
    />
  );

  return {
    isLoading,
    showLoading,
    hideLoading,
    toggleLoading,
    LoadingOverlayComponent,
  };
};

export default useLoadingOverlay;
