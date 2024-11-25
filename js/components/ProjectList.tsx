import React from 'react';

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
    <div className="border rounded" role="listbox">
      {projects.map((project) => (
        <button
          key={project.id}
          className={`w-full text-left p-3 hover:bg-gray-50 ${
            selectedProjectId === project.id 
              ? 'bg-blue-100 border-l-4 border-blue-500' 
              : ''
          }`}
          onClick={() => onSelectProject(project.id)}
          aria-selected={selectedProjectId === project.id}
          role="option"
        >
          <h3 className="font-medium">{project.name}</h3>
        </button>
      ))}
    </div>
  );
};

