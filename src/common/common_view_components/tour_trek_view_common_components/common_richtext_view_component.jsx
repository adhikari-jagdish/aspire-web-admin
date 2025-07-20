import SafeHtml from "../safeHtml";

const CommonRichTextViewComponent = ({ sectionsRef, title, data }) => {
  return (
    <div
      ref={sectionsRef}
      className={`scroll-mt-[60px] relative mt-[5px] text-justify ${
        title?.toLowerCase() === "inclusions" &&
        "bg-green-100 border border-gray-500 border-dotted p-2 rounded"
      } ${
        title?.toLowerCase() === "exclusions" &&
        "bg-red-100 border border-gray-500 border-dotted p-2 rounded"
      }`}
    >
      <SafeHtml html={data} />
    </div>
  );
};

export default CommonRichTextViewComponent;
