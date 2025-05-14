import DestinationsView from '../view/destinations_view';

const DestinationsController = () => {

    const columns = [
        { label: "Title", accessor: "title" },
        { label: "Description", accessor: "description" },
        { label: "Image", accessor: "image" },
    ];

    const destinations = [
        {
            id: 1,
            title: "Nepal",
            description: "Hello this is the description of Nepal",
            image: "Image Url",

        },
        {
            id: 2,
            title: "India",
            description: "Hello this is the description of India",
            image: "Image Url",
        },
        {
            id: 3,
            title: "Bhutan",
            description: "Hello this is the description of Bhutan",
            image: "Image Url",
        },
    ];


    return (
        <>
            <DestinationsView columns={columns} destinations={destinations} />
        </>
    )
}

export default DestinationsController