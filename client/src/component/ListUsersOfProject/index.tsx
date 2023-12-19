import React, { useState } from "react";

interface IProps {
  staff: string[];
}
export function ListUsersOfProject({ staff }: IProps) {
  const [showArray, setShowArray] = useState(false);

  const handleMouseEnter = () => {
    setShowArray(true);
  };

  const handleMouseLeave = () => {
    setShowArray(false);
  };

  return (
    <div>
      <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        שמות הצוות!!
      </p>
      {showArray && (
        <div>
          {staff.map((item) => (
            <p>{item}</p>
          ))}
        </div>
      )}
    </div>
  );
}
