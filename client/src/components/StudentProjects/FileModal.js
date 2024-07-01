import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { read, utils } from 'xlsx';
import DataGrid from 'react-data-grid';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'react-data-grid/lib/styles.css';

Modal.setAppElement('#root');

const FileModal = ({ isOpen, onRequestClose, file }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [workbook, setWorkbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileExtension = file.name.split('.').pop().toLowerCase();

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => {
      return (
        <Toolbar>
          {(slots) => {
            const {
              CurrentPageInput,
              GoToFirstPage,
              GoToLastPage,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              Zoom,
              ZoomIn,
              ZoomOut,
            } = slots;
            return (
              <div className="rpv-toolbar">
                <div className="rpv-toolbar__left">
                  <GoToFirstPage />
                  <GoToPreviousPage />
                  <CurrentPageInput />
                  <NumberOfPages />
                  <GoToNextPage />
                  <GoToLastPage />
                </div>
                <div className="rpv-toolbar__center"></div>
                <div className="rpv-toolbar__right">
                  <ZoomOut />
                  <Zoom />
                  <ZoomIn />
                </div>
              </div>
            );
          }}
        </Toolbar>
      );
    },
  });

  useEffect(() => {
    if (fileExtension === 'xlsm' || fileExtension === 'xlsx') {
      const fetchUrl = `${process.env.REACT_APP_API_URL}${file.path}`;
      console.log('Fetching XLSM/XLSX file from URL:', fetchUrl);
      fetch(fetchUrl)
        .then(response => response.arrayBuffer())
        .then(data => {
          console.log('File data received:', data);
          const workbook = read(data, { type: 'array' });
          console.log('Workbook parsed:', workbook);
          setWorkbook(workbook);
          const sheetNames = workbook.SheetNames;
          setSheetNames(sheetNames);
          setSelectedSheet(sheetNames[0]);
          loadSheet(workbook, sheetNames[0]);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching file:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [fileExtension, file.path]);

  const loadSheet = (workbook, sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
    console.log('JSON data:', jsonData);

    if (jsonData.length > 0) {
      const columns = jsonData[0].map((col, idx) => ({
        key: `col_${idx}`,
        name: col || `Column ${idx + 1}`,
        width: 150,
      }));

      const rows = jsonData.slice(1).map((row, rowIndex) => {
        const rowData = {};
        row.forEach((cell, idx) => {
          rowData[`col_${idx}`] = cell;
        });
        return rowData;
      });

      setColumns(columns);
      setRows(rows);
    } else {
      console.error('No data found in the Excel sheet');
    }
  };

  const handleSheetChange = (event) => {
    const sheetName = event.target.value;
    setSelectedSheet(sheetName);
    loadSheet(workbook, sheetName);
  };

  const renderFileContent = () => {
    if (loading) {
      return <div className="spinner">Chargement...</div>;
    }

    switch (fileExtension) {
      case 'pdf':
        return (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer fileUrl={`${process.env.REACT_APP_API_URL}${file.path}`} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        );
      case 'docx':
      case 'pptx':
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(process.env.REACT_APP_API_URL + file.path)}`}
            width="100%"
            height="300px"
            frameBorder="0"
            title="Document Viewer"
          />
        );
      case 'xlsm':
      case 'xlsx':
        return (
          columns.length > 0 && rows.length > 0 ? (
            <div>
              <select onChange={handleSheetChange} value={selectedSheet} className="sheet-select">
                {sheetNames.map(sheet => (
                  <option key={sheet} value={sheet}>{sheet}</option>
                ))}
              </select>
              <div style={{ height: '400px' }}>
                <DataGrid columns={columns} rows={rows} />
              </div>
            </div>
          ) : (
            <div>Aucune donnée trouvée</div>
          )
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <img src={`${process.env.REACT_APP_API_URL}${file.path}`} alt={file.name} style={{ maxWidth: '100%', height: 'auto' }} />;
      default:
        return <div>Type de fichier non supporté</div>;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="File Modal"
      style={{
        content: {
          inset: '10%',
          borderRadius: '10px',
          padding: '20px',
          background: '#1a1a2e',
          color: '#eaeaea',
        }
      }}
    >
      <button
        onClick={onRequestClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '40px',
          height: '40px',
          padding: '10px',
          background: '#ff4d4d',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        &times;
      </button>
      <div style={{ padding: '20px', marginTop: '40px' }}>
        <h2 style={{ textAlign: 'center' }}>{file.name}</h2>
        <div>{renderFileContent()}</div>
      </div>
    </Modal>
  );
};

export default FileModal;
