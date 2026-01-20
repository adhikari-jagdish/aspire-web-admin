import DOMPurify from "dompurify";

const SafeHtml = ({ html, title }) => {
  return (
    <div
    className={`
    [&_ul]:list-disc 
    [&_ol]:list-decimal pl-4
    [&_h1]:text-3xl [&_h1]:font-bold
    [&_h2]:text-2xl [&_h2]:font-semibold
    [&_h3]:text-xl [&_h3]:font-medium ${title === "description" && "line-clamp-2"}
    `}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html)
      }}
    />
  );
};

export default SafeHtml;
