import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CustomLineYearChart = ({ specialite }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Score Moyen Annuel',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stats/GetStats`);
        const data = response.data.filter(d => specialite === "default" || d.spe === specialite);
        const groupedData = data.reduce((acc, item) => {
          const year = new Date(item.date).getFullYear(); // Get year from the date
          acc[year] = acc[year] || [];
          acc[year].push(parseFloat(item.scoreTotal)); // Convert scoreTotal to float and push to the array
          return acc;
        }, {});

        const labels = Object.keys(groupedData).sort();
        const scores = labels.map(year => {
          const items = groupedData[year];
          return (items.reduce((sum, current) => sum + current, 0) / items.length).toFixed(2); // Calculate average
        });

        setChartData({
          labels,
          datasets: [{
            label: 'Score Moyen Annuel pour ' + (specialite === "default" ? 'toutes spécialités' : specialite),
            data: scores,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques annuelles", error);
      }
    };

    fetchStats();
  }, [specialite]);  // S'assure de recalculer lorsque la spécialité sélectionnée change

  return <Line data={chartData} />;
};

export default CustomLineYearChart;
