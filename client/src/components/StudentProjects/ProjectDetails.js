import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "./ProjectContext";
import FileModal from "./FileModal";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [project, setProject] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const foundProject = projects.find((project) => project._id === id);
    if (foundProject) {
      setProject(foundProject);
    } else {
      setProject(null);
    }
  }, [id, projects]);

  const openModal = (file) => {
    setSelectedFile(file);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedFile(null);
  };

  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  return (
    <div className="project-details-container">
      <h2 className="project-title">{project.title}</h2>
      <ul className="files-list">
        {project.files.map((file, index) => (
          <li key={index} className="file-item">
            <button onClick={() => openModal(file)} className="file-link">{file.name}</button>
          </li>
        ))}
      </ul>
      <div className="buttons-container">
        <button className="back-button" onClick={() => navigate(-1)}>Précédent</button>
        <button className="home-button" onClick={() => navigate("/")}>Page d'accueil</button>
      </div>
      {selectedFile && (
        <FileModal isOpen={modalIsOpen} onRequestClose={closeModal} file={selectedFile} />
      )}
    </div>
  );
};

export default ProjectDetails;
