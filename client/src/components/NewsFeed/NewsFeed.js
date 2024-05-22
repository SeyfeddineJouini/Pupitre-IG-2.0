import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { FaRegNewspaper } from 'react-icons/fa';
import Modal from 'react-modal';


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NewsContainer = styled.div`
  width: 100%;
  height: 600px;
  overflow-y: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Article = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  transition: box-shadow 0.3s ease-in-out;
  animation: ${fadeIn} 0.5s ease-in;
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transform: scale(1.02);
  }
`;

const ArticleTitle = styled.a`
  display: block;
  font-size: 1.4em;
  font-weight: bold;
  color: #1a73e8;
  margin-bottom: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
    color: #1558b8;
  }
`;

const ArticleIcon = styled(FaRegNewspaper)`
  margin-right: 10px;
  color: #1a73e8;
`;

const ArticleDescription = styled.p`
  font-size: 1em;
  color: #444;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxHeight: '80vh',
      overflowY: 'auto',
    },
  };

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
  
    useEffect(() => {
      const rssUrl = 'https://rss2json.com/api.json?rss_url=https://reporterre.net/spip.php?page=backend-simple';
  
      axios.get(rssUrl)
        .then(response => {
          setArticles(response.data.items);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des articles:', error);
        });
    }, []);
  
    const openModal = (link) => {
      axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(link)}`)
        .then(response => {
          setModalContent(response.data.contents);
          setModalIsOpen(true);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération du contenu de l\'article:', error);
        });
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      setModalContent('');
    };
  
    return (
      <NewsContainer>
        <h2 style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Actualités de Reporterre</h2>
        {articles.length === 0 ? (
          <p style={{ fontSize: '1.2em', color: '#777' }}>Chargement des articles...</p>
        ) : (
          articles.map(article => (
            <Article key={article.guid}>
              <ArticleImage src={article.enclosure ? article.enclosure.link : 'https://via.placeholder.com/700x467'} alt={article.title} />
              <ArticleTitle onClick={() => openModal(article.link)}>
                <ArticleIcon /> {article.title}
              </ArticleTitle>
              <ArticleDescription dangerouslySetInnerHTML={{ __html: article.description }} />
            </Article>
          ))
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Article"
        >
          <button onClick={closeModal} style={{ float: 'right', padding: '10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Fermer</button>
          <div dangerouslySetInnerHTML={{ __html: modalContent }} />
        </Modal>
      </NewsContainer>
    );
  };
  
  export default NewsFeed;