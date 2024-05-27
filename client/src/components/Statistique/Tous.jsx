import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const StackedBarChart = ({ specialite }) => {
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
        const yearData = response.data.filter(d =>
          new Date(d.date).getFullYear() === 2024 &&
          (specialite === 'default' || specialite== 'spe' || d.spe === specialite)
        );

        const monthlyData = new Array(12).fill(0).map(() => ({
          total: 0,
          specialties: {}
        }));

        yearData.forEach(item => {
          const month = new Date(item.date).getMonth();
          const score = parseFloat(item.scoreTotal);
          monthlyData[month].total += score;
          if (score <= 10000) {
            monthlyData[month].total += score;
            if (!(item.spe in monthlyData[month].specialties)) {
            monthlyData[month].specialties[item.spe] = 0;
          }
          monthlyData[month].specialties[item.spe] += score;
          }
        });

        const labels = monthNames;
        const specialtyColors = [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            // Ajoutez plus de couleurs au besoin
          ];
          
          const datasets = Object.keys(monthlyData[0].specialties).map((specialty, index) => ({
            label: specialty,
            data: monthlyData.map(data => data.specialties[specialty] || 0),
            backgroundColor: specialtyColors[index % specialtyColors.length],
            borderColor: specialtyColors[index % specialtyColors.length].replace('0.5', '1'), // Augmentez l'opacité pour la bordure
            borderWidth: 1
          }));
          
    

        setChartData({
          labels,
          datasets
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques mensuelles", error);
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
              stacked: true,
              title: {
                display: true,
                text: 'Mois'
              }
            },
            y: {
              stacked: true,
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

export default StackedBarChart;
