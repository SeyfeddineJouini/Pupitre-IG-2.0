import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ProjectContext = createContext();

export const useProjects = () => {
  return useContext(ProjectContext);
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/projects/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
      setProjects(response.data.map(project => ({ ...project, _id: project._id.toString() })));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
