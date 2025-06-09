import React from 'react';
import { Modal, Button, Group, Text } from '@mantine/core';


export function CustomDialog({
    opened,
    onClose,
    title,
    description,
    onConfirm,
    onCancel,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
}) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={title}
            centered
        >
            <Text mb="md">{description}</Text>
            <Group justify="flex-end">
                <Button variant="default" onClick={onCancel}>
                    {cancelLabel}
                </Button>
                <Button color="blue" onClick={onConfirm}>
                    {confirmLabel}
                </Button>
            </Group>
        </Modal>
    );
}