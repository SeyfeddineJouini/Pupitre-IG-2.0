import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const CustomBarYearChart = ({ specialite }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Score Moyen Annuel',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stats/GetStats`);
        const data = response.data.filter(d => specialite === "default" || d.spe === specialite);
        const groupedData = data.reduce((acc, item) => {
          const year = new Date(item.date).getFullYear();
          acc[year] = acc[year] || [];
          acc[year].push(parseFloat(item.scoreTotal));
          return acc;
        }, {});

        const labels = Object.keys(groupedData).sort();
        const scores = labels.map(year => {
          const items = groupedData[year];
          return (items.reduce((sum, current) => sum + current, 0) / items.length).toFixed(2);
        });

        setChartData({
          labels,
          datasets: [{
            label: 'Score Moyen Annuel pour ' + (specialite === "default" ? 'toutes spécialités' : specialite),
            data: scores,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques annuelles", error);
      }
    };

    fetchStats();
  }, [specialite]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Année'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Score Moyen'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false
            },
            hover: {
              mode: 'nearest',
              intersect: true
            }
          }
        }}
      />
    </div>
  );
};

export default CustomBarYearChart;


