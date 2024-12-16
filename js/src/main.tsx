import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { NumberInput } from './components/ui/NumberInput';
import { Button } from './components/ui/Button';
import { Tabs } from './components/ui/Tabs';
import { DropDown } from './components/ui/Dropdown';
import { MapSelector } from './components/ui/MapSelector';
import './css/styles.css';

const App = () => {
  // State management
  const [counter, setCounter] = useState(0);
  const [activeTab, setActiveTab] = useState('Basic');
  const [selectedValue, setSelectedValue] = useState('1');
  const [selectedLocation, setSelectedLocation] = useState<string>('');


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

  return (
    <div className="app marimo">
      <Tabs
        value={activeTab}
        tabs={['Basic', 'Map']}
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
