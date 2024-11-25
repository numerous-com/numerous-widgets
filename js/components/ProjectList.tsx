import React from 'react';
import ItemsList from './ItemsList';

interface ProjectListProps {
  projects: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  onSelectProject: (projectId: string) => void;
  selectedProjectId?: string;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onSelectProject,
  selectedProjectId,
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold mb-2">Projects</h3>
      <div className="border rounded" role="listbox">
        <ItemsList 
        items={projects} 
        onSelectItem={onSelectProject} 
        selectedItemId={selectedProjectId} 
        />
      </div>
    </div>
  );
};

