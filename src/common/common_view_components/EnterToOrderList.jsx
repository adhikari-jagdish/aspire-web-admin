import { Extension } from "@tiptap/core";

export const EnterToOrderList = Extension.create({
  name: "enterToOrderList",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state, commands } = editor;
        const { $from } = state.selection;
        const parent = $from.parent;
        const grandParent = $from.node($from.depth - 1);

        const isInOrderedList = grandParent?.type?.name === "orderedList";
        const isParagraph = parent.type.name === "paragraph";
        const hasText = parent.textContent.trim().length > 0;

        // ✅ Debug info — see what node you're in
        console.log("parent:", parent.type.name);
        console.log("grandParent:", grandParent?.type?.name);
        console.log("text:", parent.textContent);

        // If already in a list, let Tiptap handle Enter normally
        if (isInOrderedList) {
          if (!hasText)  return; // avoid exiting the list
          
          return commands.splitListItem("listItem");
        }

        // If in paragraph with text, convert to ordered list and split the item
        if (isParagraph && hasText) {
          const didToggle = commands.toggleOrderedList();

          if (didToggle) {
            setTimeout(() => {
              editor.chain().focus().splitListItem("listItem").run();
            }, 20); // small delay helps ensure doc is updated
            return true;
          }
        }

        return false;
      },
    };
  },
});
