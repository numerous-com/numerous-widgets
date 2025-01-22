import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { NumberInput } from './components/ui/NumberInput';
import { Button } from './components/ui/Button';
import { Tabs } from './components/ui/Tabs';
import { DropDown } from './components/ui/Dropdown';
import { MapSelector } from './components/ui/MapSelector';
import { ChartComponent } from './components/ui/Chart';
import './css/styles.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  // State management
  const [counter, setCounter] = useState(0);
  const [activeTab, setActiveTab] = useState('Basic');
  const [selectedValue, setSelectedValue] = useState('1');
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  // Chart data
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const temperatures = [5, 6, 9, 14, 18, 22, 25, 24, 20, 15, 10, 6];
  const energyConsumption = [100, 120, 110, 130, 125, 140, 135, 150, 145, 160, 155, 170];

  // Map configuration
  const points = {
    'New York': [-73.985428, 40.748817],
    'Paris': [2.294481, 48.858370],
    'Tokyo': [139.839478, 35.652832]
  };

  const handleIncrementCounter = () => {
    setCounter(prev => prev + 1);
  };

  const handleLocationClick = (coords: [number, number]) => {
    console.log('Clicked coordinates:', coords);
  };

  const chartConfig = {
    type: "bar",
    data: {
      labels: months,
      datasets: [
        {
          label: "Average Temperature",
          data: temperatures,
          type: "line",
          borderColor: "rgb(255, 99, 132)",
          yAxisID: "temperature"
        },
        {
          label: "Monthly Energy Consumption",
          data: energyConsumption,
          backgroundColor: "rgb(99, 110, 250)",
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Monthly Energy Consumption and Temperature"
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true
            },
            pinch: {
              enabled: true
            },
            mode: 'xy'
          },
          pan: {
            enabled: true,
            mode: 'xy'
          }
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Energy Consumption (kWh)"
          }
        },
        temperature: {
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "Temperature (°C)"
          }
        }
      }
    }
  };

  return (
    <div className="marimo">
      <div className="header-container">
        <div className="logo">
          <img src="/logo.svg" alt="Numerous Logo" />
        </div>
      </div>
      
      <div className="app">
        <Tabs
          value={activeTab}
          tabs={['Basic', 'Map', 'Chart']}
          contentUpdated={false}
          onChange={setActiveTab}
        />

        {activeTab === 'Basic' && (
          <div className="bordered_container">
            <div className="column_with_spacing">
              <NumberInput
                value={counter}
                start={0}
                stop={100}
                step={1}
                uiLabel="Counter:"
                uiTooltip="Current count value"
                onChange={setCounter}
                fitToContent={true}
              />

              <Button
                label="Increment Counter"
                onClick={handleIncrementCounter}
              />

              <DropDown
                options={['1', '2', '3']}
                uiLabel="Dropdown:"
                uiTooltip="Select a value"
                fitToContent={true}
                selected_key={selectedValue}
                onChange={setSelectedValue}
              />
            </div>
          </div>
        )}

        {activeTab === 'Map' && (
          <MapSelector
            points={points}
            value={selectedLocation}
            center={[2.294481, 48.858370]}
            zoom={0}
            onChange={setSelectedLocation}
            onLocationClick={handleLocationClick}
          />
        )}

        {activeTab === 'Chart' && (
          <div className="bordered_container">
            <ChartComponent {...chartConfig} />
          </div>
        )}
      </div>

      <footer>
        <p>&copy; 2024 Numerous ApS. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Render the app
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
