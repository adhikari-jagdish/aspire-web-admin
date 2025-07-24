

const CommonDiscountBatchComponent = ({ discountInPercentage }) => {
    return (
        <div
            className="
                    absolute 
                    right-[10px]
                    top-[70px]
                    translate-y-[-50%]
                    bg-red-600
                    text-white
                    px-2.5
                    py-1.5
                    rounded-[50%]
                    font-bold
                    w-[90px]
                    h-[90px]
                    text-sm
                    whitespace-nowrap
                    shadow-md
                    pointer-events-none
                    select-none
                    flex
                    items-center 
                    justify-center
                    z-[999]
                    "
        >
            <span className="font-bold text-5xl">{discountInPercentage}</span>
             <div className="flex flex-col items-center justify-center">
             <span className="text-xl">%</span>
                <span className="">OFF</span>
             </div>
        </div>
    );
}

export default CommonDiscountBatchComponent;

// 🏷️