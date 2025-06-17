import { Modal, Button, Text, Group } from "@mantine/core";

function CustomDialogModal({ opened, onClose, title, message, onConfirm }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      size="sm"
      className="p-4"
    >
      <Text className="mb-4">{message}</Text>
      <Group position="right">
        <Button variant="outline" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="blue"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          OK
        </Button>
      </Group>
    </Modal>
  );
}

export default CustomDialogModal;
