import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const MonthlyLineChartByYear = ({ specialite }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stats/GetStats`);
        const data = response.data.filter(d => specialite === "default" || d.spe === specialite);
        const groupedData = data.reduce((acc, item) => {
          const year = new Date(item.date).getFullYear();
          acc[year] = acc[year] || new Array(12).fill(0);
          const month = new Date(item.date).getMonth();
          acc[year][month] += Math.min(item.scoreTotal, 200);
          return acc;
        }, {});

        const years = Object.keys(groupedData).sort();
        const datasets = years.map((year, index) => ({
          label: `Score Mensuel ${year} pour ${specialite === "default" ? 'toutes spécialités' : specialite}`,
          data: groupedData[year],
          borderColor: `hsl(${360 * index / years.length}, 100%, 50%)`,
          backgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          pointHoverBorderColor: 'transparent',
          pointHoverBackgroundColor: 'transparent',
          pointBackgroundColor: 'transparent',
          fill: false,
          tension: 0.1
        }));

        const labels = monthNames;

        setChartData({
          labels,
          datasets
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques annuelles", error);
      }
    };

    fetchStats();
  }, [specialite]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mois'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Score Mensuel'
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

export default MonthlyLineChartByYear;

