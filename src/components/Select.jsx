/* eslint-disable react/prop-types */
import React, { useId } from "react";
import { useSelector } from "react-redux"; // Import useSelector to access the theme

function Select(
  { options, label, className, ...props },
  ref
) {
  const id = useId();
  const currentTheme = useSelector((state) => state.theme.theme); // Get the current theme from Redux

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`inline-block mb-1 pl-1 ${
            currentTheme === "dark" ? "text-nebula-400" : "text-space-800"
          }`}
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg outline-none  duration-200 border w-full ${
          currentTheme === "dark"
            ? "bg-cosmic-light-secondary text-cosmic-text border-nebula-400/20 hover:border-nebula-400/30 focus:bg-cosmic-light-primary"
            : "bg-cosmic-dark-secondary text-space-800 border-space-800/20 hover:border-space-800/30 focus:bg-cosmic-dark-primary"
        } ${className}`}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className={`${
              currentTheme === "dark"
                ? "bg-cosmic-light-secondary text-cosmic-text hover:bg-cosmic-light-primary"
                : "bg-cosmic-dark-primary text-space-800 hover:bg-cosmic-dark-secondary"
            }`}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);