import { Modal, Button, Text, Group } from "@mantine/core";

function CustomDialogModal({ opened, onClose, title, message, onConfirm }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="xl" weight={700} className="text-gray-900 tracking-tight">
          {title}
        </Text>
      }
      centered
      size="md"
      className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-white to-gray-50"
      overlayProps={{
        color: "rgba(0, 0, 0, 0.6)",
        blur: 4,
      }}
      transitionProps={{
        transition: "slide-up",
        duration: 0.4,
        timingFunction: "ease-in-out",
      }}
    >
      <div className="px-2">
        <div className="pb-8">
          <Text className="mb-4 text-gray-700 text-base leading-relaxed font-medium">
            {message}
          </Text>
        </div>
        <Group position="right" className="justify-end gap-4">
          <Button
            variant="outline"
            color="gray"
            onClick={onClose}
            className="border-gray-400 text-gray-700 hover:bg-gray-200 hover:border-gray-500 transition-all duration-300 rounded-xl px-6 py-2 font-semibold"
          >
            Cancel
          </Button>
          <Button
            color="blue"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 rounded-xl px-6 py-2 font-semibold shadow-md"
          >
            OK
          </Button>
        </Group>
      </div>
    </Modal>
  );
}

export default CustomDialogModal;
