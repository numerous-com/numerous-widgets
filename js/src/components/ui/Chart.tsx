import * as React from "react";
import { Chart } from 'react-chartjs-2';
import type { ChartType, ChartData, ChartOptions } from 'chart.js';

interface ChartProps {
    type: ChartType;
    data: ChartData;
    options?: ChartOptions;
}

export function ChartComponent({ type, data, options = {} }: ChartProps) {
    const defaultOptions: ChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        devicePixelRatio: 2,
        plugins: {
            title: {
                font: {
                    size: 20,
                    weight: '400'  // Lighter weight (normal)
                }
            }
        }
    };

    const mergedOptions = { ...defaultOptions, ...options };

    return (
        <div className="chart-container">
            <Chart type={type} data={data} options={mergedOptions} />
        </div>
    );
} 