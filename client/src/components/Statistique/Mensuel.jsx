import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CustomLineChart = ({ specialite }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: '',
      data: [],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  });

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

 // Key idea: Use useEffect to fetch data when `specialite` changes.
// If `specialite` is "default", fetch all data; otherwise, filter by the specific specialty.
// Use the `key` prop on the chart component to force a re-render when `specialite` changes.

useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/stats/GetStats`);
      const yearData = response.data.filter(d =>
        new Date(d.date).getFullYear() === 2024 &&
        (specialite === 'default' || d.spe === specialite)
      );

      const monthlyData = new Array(12).fill(0).map(() => []);
      yearData.forEach(item => {
        const month = new Date(item.date).getMonth(); // 0 for January
        monthlyData[month].push(parseFloat(item.scoreTotal));
      });

      const labels = monthNames;
      const scores = monthlyData.map((data, index) => {
        if (data.length === 0) {
          // If no data for a month, explicitly set to null or 0
          return null;
        }
        const sum = data.reduce((acc, curr) => acc + curr, 0);
        return (sum / data.length).toFixed(2);
      });

      setChartData({
        labels,
        datasets: [{
          label: `Score Moyen Mensuel pour ${specialite === "default" ? "toutes spécialités" : specialite}`,
          data: scores,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          spanGaps: true, // This allows gaps in data if a month has no data
        }]
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques mensuelles", error);
    }
  };

  fetchStats();
}, [specialite]); // Re-run when specialite changes

return (
  <Line data={chartData} key={specialite} /> // Add the key prop here
);
}

export default CustomLineChart;







  
 