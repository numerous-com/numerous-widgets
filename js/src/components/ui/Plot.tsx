import * as React from "react";
import Plot from 'react-plotly.js';
import type { Data, Layout, Config } from 'plotly.js';

interface PlotProps {
    data: Data[];
    layout?: Partial<Layout>;
    config?: Partial<Config>;
}

export function PlotComponent({ data, layout = {}, config = {} }: PlotProps) {
    const [isVisible, setIsVisible] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (containerRef.current) {
            setIsVisible(true);
        }
    }, []);

    const defaultLayout = {
        autosize: true,
        margin: { t: 40, r: 10, l: 50, b: 50 },
        ...layout,
    };

    const defaultConfig = {
        responsive: true,
        displayModeBar: false,
        ...config,
    };

    return (
        <div className="plot-container" ref={containerRef}>
            {isVisible && (
                <Plot
                    data={data}
                    layout={defaultLayout}
                    config={defaultConfig}
                    useResizeHandler={false}
                    style={{ width: '90%', height: '90%' }}
                />
            )}
        </div>
    );
} 