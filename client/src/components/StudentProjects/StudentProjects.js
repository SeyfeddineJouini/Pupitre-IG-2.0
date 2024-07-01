import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "./ProjectContext";
import "./StudentProjects.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const StudentProjects = () => {
  const { projects, deleteProject } = useProjects();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteProject(id);
      } catch (error) {
        console.error('Error deleting project:', error);
        setError("Une erreur est survenue lors de la suppression du projet. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const Button = ({ className, onClick, icon, children }) => (
    <button className={className} onClick={onClick} disabled={isLoading}>
      <FontAwesomeIcon icon={icon} /> {children}
    </button>
  );

  return (
    <div className="projects-container">
      <div className="buttons-container">
        <Button className="home-button" onClick={() => navigate("/")} icon={faHome}>
          Page d'accueil
        </Button>
        {isAuthenticated && (
          <Button className="add-button" onClick={() => navigate("/add-project")} icon={faPlus}>
            Ajouter un Projet
          </Button>
        )}
      </div>
      {isLoading && <p>Suppression en cours...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="projects-grid">
        {projects.length === 0 ? (
          <p className="no-projects-message">Aucun projet disponible.</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3>{project.title}</h3>
              <div className="button-group">
                <Link to={`/projects/${project._id}`} className="project-link">Voir les détails</Link>
                {isAuthenticated && (
                  <Button className="delete-button" onClick={() => handleDelete(project._id)} icon={faTrash}>
                    Supprimer
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentProjects;
