import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode; // Define the type for children
}

export const Card: React.FC<CardProps> = ({ children }) => (
  <div className="border rounded-lg shadow-lg p-4 bg-white/90 backdrop-blur-sm">
    {children}
  </div>
);

// Define the CardHeader component
export const CardHeader: React.FC<CardProps> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

// Define the CardTitle component
export const CardTitle: React.FC<CardProps> = ({ children }) => (
  <h2 className="text-3xl font-bold text-blue-800">{children}</h2>
);

export const CardContent = ({ children }) => <div>{children}</div>;
