import React, { useState } from "react";

function SpinnerInput({
  options,
  getSelected,
  className,
}: {
  options: string[];
  getSelected: (option: string) => void;
  className?: string;
}) {
  const [value, setValue] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setValue(event.target.value);
    getSelected(event.target.value);
  };

  return (
    <select value={value} onChange={handleChange} className="p-2" required>
      <option value="" className={className}>
        Selecciona una opción
      </option>
      {options?.map((option) => {
        return (
          <option className={className} key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

export default SpinnerInput;
