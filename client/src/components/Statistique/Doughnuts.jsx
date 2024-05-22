import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const CustomChart = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [chartData, setChartData] = useState({
    labels: ['Transport', 'Alimentation', 'Logement', 'Divers'],
    datasets: [{
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverOffset: 4
    }]
  });
  const options = {
    plugins: {
      legend: {
        display: false, 
        onHover: function(e) {
          e.native.target.style.cursor = 'pointer';
        }// Cela enlève la légende par défaut
      }
    }
  };


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stats/GetStats`);
        if (response.data && response.data.length) {
          const totals = response.data.reduce((acc, curr) => {
            acc.transport += parseInt(curr.transport, 10);
            acc.alimentation += parseInt(curr.alimentation, 10);
            acc.logement += parseInt(curr.logement, 10);
            acc.divers += parseInt(curr.divers, 10);
            return acc;
          }, { transport: 0, alimentation: 0, logement: 0, divers: 0 });

          const totalValues = [
            totals.transport, 
            totals.alimentation, 
            totals.logement, 
            totals.divers
          ];

          setChartData({
            labels: ['Transport', 'Alimentation', 'Logement', 'Divers'],
            datasets: [{
              data: totalValues,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              hoverOffset: 4
            }]
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données pour le graphique Doughnut', error);
      }
    };

    fetchStats();
  }, []);

  if (chartData.datasets[0].data.length === 0) {
    return <div>Loading...</div>;
  }

  const total = chartData.datasets[0].data.reduce((sum, value) => sum + value, 0);

  return (
    <div>
      <Doughnut data={chartData}  options={options} />
      <div className="legend space-y-2 w-full mx-auto">
        {chartData.labels.map((label, index) => {
          const value = chartData.datasets[0].data[index];
          const color = chartData.datasets[0].backgroundColor[index];
          const percentage = ((value / total) * 100).toFixed(2);
          return (
            <div key={index} className="flex items-center">
              <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm">{`${label}: ${value} tCO2e (${percentage}%)`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomChart;







