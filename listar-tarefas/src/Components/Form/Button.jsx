import React from "react";

const Button = ({ children }) => {
  return <button className="bg-sky-500 text-white font-semibold py-2 px-8 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600 mt-3">{children}</button>;
};

export default Button;
