import React, { useState, useEffect } from 'react';

interface ItemDetailsProps {
  name: string;
  description: string;
  title: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  name,
  description,
  title,
  onNameChange,
  onDescriptionChange,
  children,
}) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="scrollable-content">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>
        {children}
      </div>
    </div>
  );
}; 