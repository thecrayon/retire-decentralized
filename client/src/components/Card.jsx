import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="min-w-[300px] md:min-w-[500px] min-h-[300px] bg-white rounded-[10px] mx-2">
      <div className="mt-2 ml-2 font-semibold font-poppins text-md md:text-lg">
        {title}
      </div>
      <div className={`mt-5 md:mt-10 ml-1 font-poppins w-full px-5`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
