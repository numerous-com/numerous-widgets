import React, { useState, useEffect } from 'react';

interface ItemDetailsProps {
  name: string;
  description: string;
  onSave: (name: string, description: string) => void;
  onClose: () => void;
  title: string;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  name: initialName,
  description: initialDescription,
  onSave,
  onClose,
  title,
  children,
}) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
  }, [initialName, initialDescription]);

  const handleCancel = () => {
    setName(initialName);
    setDescription(initialDescription);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, description);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="scrollable-content">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2"
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
        {children}
      </div>
    </div>
  );
}; 