/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className=" w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${className}`}
        type={type}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
