import { TextareaHTMLAttributes } from 'react';

export const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="border rounded px-3 py-2 w-full border-teal-300 focus:border-blue-500 focus:ring-blue-500"
  />
);
