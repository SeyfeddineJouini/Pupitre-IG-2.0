import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProject.css";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "./ProjectContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faUpload, faSpinner, faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileErrors, setFileErrors] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addProject } = useProjects();
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const VALID_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'xlsx'];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    const errors = [];

    selectedFiles.forEach(file => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const isValidExtension = VALID_EXTENSIONS.includes(fileExtension);
      const isValidSize = file.size <= MAX_FILE_SIZE;

      if (!isValidExtension) {
        errors.push({ name: file.name, message: "Type de fichier non supporté", fileName: file.name });
      } else if (!isValidSize) {
        errors.push({ name: file.name, message: "Le fichier est trop volumineux", fileName: file.name });
      } else {
        validFiles.push(file);
      }
    });

    setFiles(validFiles);
    setFileErrors(errors);
  };

  const handleFileRemove = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
    setFileErrors(fileErrors.filter(file => file.name !== fileName));
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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/add`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        });

        const newProject = {
          _id: response.data.id,
          title: response.data.title,
          files: response.data.files,
        };
        addProject(newProject);
        navigate("/projects");
      } catch (error) {
        console.error("Error uploading files", error);
        setError("Une erreur s'est produite lors du téléchargement des fichiers. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
        setUploadProgress(0);
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
              <input 
                type="file" 
                multiple 
                onChange={handleFileChange} 
                required 
                title={files.length > 0 ? `${files.length} fichier(s) sélectionné(s)` : 'Parcourir...'}
              />
              <div className="file-feedback">
                {Array.from(files).map(file => (
                  <div key={file.name} className="file-feedback-item">
                    <FontAwesomeIcon icon={faCheckCircle} className="file-valid" />
                    {file.name}
                  </div>
                ))}
              </div>
              <div className="file-feedback">
                {fileErrors.map((error, index) => (
                  <div key={index} className="file-feedback-item">
                    <FontAwesomeIcon icon={faTimesCircle} className="file-invalid" />
                    <span className="error-message">{error.message}: </span>
                    <span className="file-name">{error.fileName}</span>
                    <button onClick={() => handleFileRemove(error.name)} className="remove-file-button">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="selected-file-count">
              {files.length === 0 ? "Aucun fichier valide sélectionné." :
               files.length === 1 ? "1 fichier valide sélectionné." :
               `${files.length} fichiers valides sélectionnés.`}
            </div>
            {isLoading ? (
              <>
                <p>Téléchargement des fichiers... {uploadProgress}%</p>
                <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </>
            ) : (
              <button type="submit" className="submit-button">
                <FontAwesomeIcon icon={faUpload} /> Ajouter le Projet
              </button>
            )}
            {error && <p className="error-message">{error}</p>}
          </form>
          <button onClick={() => navigate("/projects")} className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} /> Retour à la liste des projets
          </button>
        </>
      ) : (
        <p>Vous devez être connecté pour ajouter un projet.</p>
      )}
    </div>
  );
};

export default AddProject;
