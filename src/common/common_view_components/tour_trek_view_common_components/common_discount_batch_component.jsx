

const CommonDiscountBatchComponent = ({ discountInPercentage }) => {
    return (
        <div
            className="
                    absolute right-[20px]
                    top-[-20px]
                    translate-y-[-50%]
                    bg-red-600
                    text-white
                    px-2.5
                    py-1.5
                    rounded-lg
                    font-bold
                    text-sm
                    whitespace-nowrap
                    shadow-md
                    pointer-events-none
                    select-none"
        >
            <span style={{ fontSize: "20px", lineHeight: 1 }}>🏷️</span>
            {discountInPercentage}% off
        </div>
    );
}

export default CommonDiscountBatchComponent;