import DOMPurify from 'dompurify';

const SafeHtml = ({html}) => {
    return (
      <div  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html),}}
      />
    )
  }

  export default SafeHtml;