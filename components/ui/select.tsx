import React from 'react';

export const Select = ({ children, value, onValueChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="border border-gray-300 rounded p-2"
    >
      {children}
    </select>
  );
};

export const SelectTrigger = ({ children }) => {
  return <div>{children}</div>;
};

export const SelectContent = ({ children }) => {
  return <div className="absolute bg-white border border-gray-300 rounded">{children}</div>;
};

export const SelectItem = ({ value, children }) => {
  return (
    <option value={value} className="p-2 hover:bg-gray-100">
      {children}
    </option>
  );
};

export const SelectValue = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};