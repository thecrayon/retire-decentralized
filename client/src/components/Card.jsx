import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="min-w-[300px] md:min-w-[550px] min-h-[300px] bg-white rounded-[10px] p-2">
      <h2 className="mt-1 ml-1 font-bold font-poppins text-md md:text-lg uppercase">
        {title}
      </h2>
      <p className={`mt-5 md:mt-10 ml-1 font-poppins`}>{children}</p>
    </div>
  );
};

export default Card;
