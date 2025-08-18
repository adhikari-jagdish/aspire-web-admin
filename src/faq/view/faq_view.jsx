import { Title } from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";

const FaqView = ({
  handleClick,
  faqTitles,
  handleTitleClick,
  handleTitlePlusClick,
  faqDataList,
  expandedSubtitleId,
  toggleSubtitle,
}) => {
  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-15 right-6 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-800 transition-colors duration-200 z-50"
        aria-label="Add new FAQ Title"
      >
        <IconPlus size={24} stroke={2} />
      </button>

      <div className="grid grid-cols-3 gap-6 m-4 mt-6">
        <div className="col-span-1 border-r pr-4">
          <Title order={4}>FAQ Titles</Title>
          {faqTitles && faqTitles.length > 0 ? (
            <div className="space-y-3 mt-3">
              {faqTitles.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-gray-100"
                >
                  <p
                    className="flex-1"
                    onClick={() => handleTitleClick(item._id)}
                  >
                    {item.title}
                  </p>
                  <button
                    onClick={() => handleTitlePlusClick(item._id)}
                    className="cursor-pointer border rounded-full p-1"
                  >
                    <IconPlus size={16} stroke={2} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-3">No FAQ titles available.</p>
          )}
        </div>

        {/* RIGHT SIDE - FAQ Data */}
        <div className="col-span-2">
          <Title order={4}>FAQ Details</Title>
          {faqDataList && faqDataList.length > 0 ? (
            <div className="mt-3 space-y-3">
              {faqDataList.map((faq) => (
                <div key={faq._id} className="border rounded p-3">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSubtitle(faq._id)}
                  >
                    <p className="font-medium">{faq.subtitle}</p>
                    {expandedSubtitleId === faq._id ? (
                      <IconMinus size={16} stroke={2} />
                    ) : (
                      <IconPlus size={16} stroke={2} />
                    )}
                  </div>

                  {expandedSubtitleId === faq._id && (
                    <p className="mt-2 text-gray-600">{faq.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-3">
              Select a title to view details.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default FaqView;
