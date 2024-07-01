import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProject.css";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "./ProjectContext";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addProject } = useProjects();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (title && files.length > 0) {
      const formData = new FormData();
      formData.append("title", title);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      setIsLoading(true);

      try {
        console.log("Uploading files...");
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Files uploaded, response:", response.data);

        const newProject = {
          _id: response.data.id,
          title: response.data.title,
          files: response.data.files,
        };
        addProject(newProject);
        navigate("/projects");
      } catch (error) {
        console.error("Error uploading files", error);
        setError("An error occurred while uploading files. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div className="add-project-container">
      {isAuthenticated ? (
        <>
          <h2>Ajouter un Nouveau Projet</h2>
          <form onSubmit={handleSubmit} className="add-project-form">
            <div className="form-group">
              <label>Titre du Projet</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Fichiers</label>
              <input type="file" multiple onChange={handleFileChange} required />
            </div>
            {isLoading ? (
              <p>Uploading files...</p>
            ) : (
              <button type="submit" className="submit-button">Ajouter le Projet</button>
            )}
            {error && <p className="error-message">{error}</p>}
          </form>
          <button onClick={() => navigate("/projects")} className="back-button">Retour à la liste des projets</button>
        </>
      ) : (
        <p>Vous devez être connecté pour ajouter un projet.</p>
      )}
    </div>
  );
};

export default AddProject;
