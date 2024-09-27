import { InputHTMLAttributes } from 'react';

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="border rounded px-3 py-2 w-full border-teal-300 focus:border-blue-500 focus:ring-blue-500"
  />
);
