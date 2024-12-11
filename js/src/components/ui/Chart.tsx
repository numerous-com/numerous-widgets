import * as React from "react";
import { Chart } from 'react-chartjs-2';
import type { ChartType, ChartData, ChartOptions } from 'chart.js';

interface ChartProps {
    type: ChartType;
    data: ChartData;
    options?: ChartOptions;
}

export function ChartComponent({ type, data, options = {} }: ChartProps) {
    return (
        <div className="chart-container">
            <Chart type={type} data={data} options={options} />
        </div>
    );
} 