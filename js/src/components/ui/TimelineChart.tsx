import * as React from "react";
import { Chart } from 'react-chartjs-2';
import type { ChartOptions, ChartData } from 'chart.js';
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

// Register required components if not already registered
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

// Since date-fns is causing import issues, we'll implement simple date formatting functions
function parseISO(dateString: string): Date {
    return new Date(dateString);
}

function format(date: Date, formatString: string): string {
    // Basic formatting for our needs
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    if (formatString === 'yyyy-MM-dd HH:00') {
        return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:00`;
    } else if (formatString === 'MMM d, HH:00') {
        return `${monthNames[month]} ${day}, ${hours.toString().padStart(2, '0')}:00`;
    }
    
    // Default format
    return date.toLocaleString();
}

interface Channel {
    id: string;
    name: string;
    description: string;
    unit: string;
    color?: string;
    chart_id?: string;
    chart_type?: 'line' | 'bar';
}

interface DataBlock {
    id: string;
    name: string;
    order: number;
    start_hour: string;
    end_hour: string;
    data: {
        [channelId: string]: (number | null)[];
    };
    // Dependency relationship properties
    dependencies?: string[];  // IDs of blocks this block depends on
    isDependent?: boolean;    // Flag to mark this as a dependent block
    referenceOrder?: number;  // The specific order being referenced
    dependencyType?: 'version' | 'extension' | 'derivative'; // Type of dependency relationship
}

interface TimelineChartProps {
    channels: Channel[];
    blocks: DataBlock[];
    viewMode: string;
    selectedChannelId: string | null;
    chartOptions?: ChartOptions;
    onViewModeChange: (mode: string) => void;
    onChannelSelect: (channelId: string) => void;
    onChannelChartUpdate: (channelId: string, chartType: string, chartId?: string) => void;
}

// Define the DEFAULT_COLORS array if not already defined
const DEFAULT_COLORS = [
    'rgba(255, 99, 132, 1)',   // Red
    'rgba(54, 162, 235, 1)',   // Blue
    'rgba(75, 192, 192, 1)',   // Green
    'rgba(153, 102, 255, 1)',  // Purple
    'rgba(255, 159, 64, 1)',   // Orange
    'rgba(255, 205, 86, 1)',   // Yellow
    'rgba(201, 203, 207, 1)',  // Grey
    'rgba(77, 201, 246, 1)',   // Light blue
    'rgba(162, 213, 198, 1)',  // Mint
    'rgba(205, 112, 88, 1)',   // Coral
];

// Add a new interface for chart grouping
interface ChartGroup {
    id: string;
    channels: Channel[];
    chart: React.RefObject<any>;
    shouldRender: boolean;
    key: number;
}

export function TimelineChart({ 
    channels,
    blocks, 
    viewMode, 
    selectedChannelId, 
    chartOptions = {},
    onViewModeChange,
    onChannelSelect,
    onChannelChartUpdate
}: TimelineChartProps) {
    // Keep a reference to the chart instances for cleanup
    const chartRefs = React.useRef<{[key: string]: any}>({});
    
    // Add a ref for the chart container
    const chartContainerRef = React.useRef<HTMLDivElement | null>(null);
    
    // Add state to control when the charts should render
    const [shouldRenderCharts, setShouldRenderCharts] = React.useState(false);
    
    // Add keys to force complete re-renders when needed
    const [chartKeys, setChartKeys] = React.useState<{[key: string]: number}>({
        main: 0 // Default main chart
    });
    
    // Add state to track transitions of any kind
    const [isTransitioning, setIsTransitioning] = React.useState(false);
    
    // Track what type of transition is happening
    const [transitionType, setTransitionType] = React.useState<'view-mode' | 'channel' | null>(null);
    
    // Track previous view mode and channel to detect changes
    const prevViewModeRef = React.useRef(viewMode);
    const prevSelectedChannelIdRef = React.useRef(selectedChannelId);
    
    // Group channels by chart_id
    const chartGroups = React.useMemo(() => {
        // Group channels by chart_id
        const groupedChannels: {[chartId: string]: Channel[]} = {};
        
        channels.forEach(channel => {
            const chartId = channel.chart_id || 'main';
            if (!groupedChannels[chartId]) {
                groupedChannels[chartId] = [];
            }
            groupedChannels[chartId].push(channel);
        });
        
        // Create chart groups
        return Object.entries(groupedChannels).map(([chartId, channelsInGroup]) => ({
            id: chartId,
            channels: channelsInGroup,
            chart: React.createRef<ChartJS | null>(),
            shouldRender: false,
            key: chartKeys[chartId] || 0
        }));
    }, [channels, chartKeys]);
    
    // Initialize chart keys for any new chart IDs
    React.useEffect(() => {
        setChartKeys(prev => {
            const newKeys = {...prev};
            // Create keys for any new chart IDs that don't exist yet
            let updated = false;
            
            channels.forEach(channel => {
                const chartId = channel.chart_id || 'main';
                if (!(chartId in newKeys)) {
                    newKeys[chartId] = 0;
                    updated = true;
                }
            });
            
            return updated ? newKeys : prev;
        });
    }, [channels]);

    // Debug logging
    React.useEffect(() => {
        // Calculate distinct chart IDs
        const distinctChartIds = new Set(channels.map(c => c.chart_id || 'main')).size;
        
        console.log("TimelineChart rendered with:", {
            channelsCount: channels.length,
            blocksCount: blocks.length, 
            chartGroupsCount: distinctChartIds,
            viewMode,
            selectedChannelId,
            isTransitioning
        });
    }, [channels.length, blocks.length, viewMode, selectedChannelId, isTransitioning]);

    // Safely destroy all chart instances
    const destroyAllCharts = React.useCallback(() => {
        Object.entries(chartRefs.current).forEach(([chartId, chart]) => {
            if (chart) {
                console.log(`Destroying chart ${chartId} instance`);
                try {
                    chart.destroy();
                } catch (err) {
                    console.error(`Error destroying chart ${chartId}:`, err);
                }
                chartRefs.current[chartId] = null;
            }
        });
    }, []);

    // Safely create chart instances when needed
    const setChartRef = React.useCallback((chartId: string, ref: any) => {
        if (!ref) return;
        
        try {
            // If there's an existing chart, destroy it first
            if (chartRefs.current[chartId]) {
                console.log(`Replacing existing chart ${chartId} instance`);
                chartRefs.current[chartId]?.destroy();
            }
            
            chartRefs.current[chartId] = ref;
            console.log(`Chart ${chartId} instance created and stored, key: ${chartKeys[chartId] || 0}`);
        } catch (err) {
            console.error(`Error setting chart ${chartId} ref:`, err);
        }
    }, [chartKeys]);

    // Handle view mode and channel selection changes
    React.useEffect(() => {
        const viewModeChanged = prevViewModeRef.current !== viewMode;
        const channelChanged = prevSelectedChannelIdRef.current !== selectedChannelId;
        
        if (viewModeChanged || channelChanged) {
            const changeType = viewModeChanged ? "view mode" : "selected channel";
            setTransitionType(viewModeChanged ? 'view-mode' : 'channel');
                
            console.log(`${changeType} changing: ${viewModeChanged ? 
                `${prevViewModeRef.current} -> ${viewMode}` : 
                `${prevSelectedChannelIdRef.current} -> ${selectedChannelId}`}`);
            
            // Start transition - hide chart during the change
            setIsTransitioning(true);
            setShouldRenderCharts(false);
            
            // Safely destroy all chart instances
            destroyAllCharts();
            
            // Allow time for DOM cleanup
            const timer = setTimeout(() => {
                // Update the keys to force a complete re-render
                setChartKeys(prev => {
                    const newKeys = {...prev};
                    Object.keys(newKeys).forEach(chartId => {
                        newKeys[chartId] = newKeys[chartId] + 1;
                    });
                    return newKeys;
                });
                
                // End transition after a short delay
                setIsTransitioning(false);
                
                // Update refs to current values
                prevViewModeRef.current = viewMode;
                prevSelectedChannelIdRef.current = selectedChannelId;
                
                // Delay setting shouldRenderCharts to ensure DOM is ready
                setTimeout(() => {
                    setTransitionType(null);
                    setShouldRenderCharts(true);
                }, 50);
            }, 300); // Increased timeout for more reliability
            
            return () => clearTimeout(timer);
        }
    }, [viewMode, selectedChannelId, destroyAllCharts]);

    // Effect to handle safe chart rendering only when DOM is ready
    React.useEffect(() => {
        let mounted = true;
        
        // Use a short timeout to ensure DOM is ready
        const timer = setTimeout(() => {
            if (mounted && chartContainerRef.current && !isTransitioning) {
                setShouldRenderCharts(true);
            }
        }, 250); // Increased timeout for more reliability
        
        return () => {
            mounted = false;
            clearTimeout(timer);
            setShouldRenderCharts(false);
            
            // Make sure all charts are destroyed when component unmounts
            destroyAllCharts();
        };
    }, [isTransitioning, destroyAllCharts]);

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            destroyAllCharts();
        };
    }, [destroyAllCharts]);

    // Sort blocks by order and identify dependent blocks
    const { sortedBlocks, dependencyMap } = React.useMemo(() => {
        console.log("Sorting blocks:", blocks);
        if (!blocks || blocks.length === 0) return { sortedBlocks: [], dependencyMap: {} };
        
        // Create a map of block dependencies
        const dependencyMap: Record<string, string[]> = {};
        
        // First, identify all dependent blocks
        blocks.forEach(block => {
            if (block.dependencies && block.dependencies.length > 0) {
                dependencyMap[block.id] = block.dependencies;
            }
        });
        
        // Sort blocks by order, with dependent blocks properly positioned
        const sorted = [...blocks].sort((a, b) => {
            // If both blocks have the same referenceOrder, sort by their own order
            if (a.referenceOrder !== undefined && b.referenceOrder !== undefined && 
                a.referenceOrder === b.referenceOrder) {
                return a.order - b.order;
            }
            
            // If one block references the other's order, put the referenced block first
            if (a.referenceOrder !== undefined && b.order === a.referenceOrder) {
                return 1; // b comes before a
            }
            if (b.referenceOrder !== undefined && a.order === b.referenceOrder) {
                return -1; // a comes before b
            }
            
            // Default sort by order
            return a.order - b.order;
        });
        
        return { sortedBlocks: sorted, dependencyMap };
    }, [blocks]);
    
    // Default to first channel if none selected
    const effectiveSelectedChannelId = selectedChannelId || (channels.length > 0 ? channels[0].id : null);
    
    // Generate time labels from the blocks
    const timeLabels = React.useMemo(() => {
        console.log("Generating time labels from blocks:", sortedBlocks);
        if (!sortedBlocks || sortedBlocks.length === 0) return [];
        
        // Find earliest start and latest end times across all blocks
        let earliestStart = new Date().toISOString();
        let latestEnd = new Date(0).toISOString();
        
        sortedBlocks.forEach(block => {
            if (block.start_hour < earliestStart) earliestStart = block.start_hour;
            if (block.end_hour > latestEnd) latestEnd = block.end_hour;
        });
        
        // Generate hours between start and end
        const startDate = parseISO(earliestStart);
        const endDate = parseISO(latestEnd);
        
        const labels: string[] = [];
        const currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
            labels.push(format(currentDate, 'yyyy-MM-dd HH:00'));
            currentDate.setHours(currentDate.getHours() + 1);
        }
        
        console.log("Generated time labels:", labels);
        return labels;
    }, [sortedBlocks]);
    
    // For each chart group, prepare chart data
    const prepareChartData = React.useCallback((chartGroup: ChartGroup) => {
        if (!timeLabels || timeLabels.length === 0) {
            return {
                labels: [],
                datasets: []
            };
        }
        
        const chartGroupChannels = chartGroup.channels;
        
        if (viewMode === 'channel') {
            // In channel mode, only show the selected channel
            const selectedChannel = chartGroupChannels.find(ch => ch.id === effectiveSelectedChannelId);
            if (!selectedChannel) {
                return {
                    labels: timeLabels,
                    datasets: []
                };
            }
            
            // Channel view mode - each block is a separate dataset
            return {
                labels: timeLabels,
                datasets: sortedBlocks.map((block, blockIndex) => {
                    const color = DEFAULT_COLORS[blockIndex % DEFAULT_COLORS.length];
                    const channelData = block.data && block.data[selectedChannel.id] 
                        ? block.data[selectedChannel.id] 
                        : [];
                    
                    // Find the hour range for this block
                    const startDate = parseISO(block.start_hour);
                    const endDate = parseISO(block.end_hour);
                    
                    // Create data array with proper positioning in the timeline
                    const data = new Array(timeLabels.length).fill(null);
                    
                    // Fill in data from this block
                    timeLabels.forEach((label, index) => {
                        const labelDate = parseISO(label);
                        
                        // Check if this label timestamp is within block's time range
                        if (labelDate >= startDate && labelDate <= endDate) {
                            // Calculate relative position in the block's range
                            const hourOffset = Math.floor((labelDate.getTime() - startDate.getTime()) / (60 * 60 * 1000));
                            if (hourOffset >= 0 && hourOffset < channelData.length) {
                                data[index] = channelData[hourOffset];
                            }
                        }
                    });
                    
                    // Create dataset with type based on channel's chart_type
                    return {
                        label: `${block.name}`,
                        data,
                        type: selectedChannel.chart_type || 'line',
                        borderColor: color,
                        backgroundColor: color.replace('1)', '0.5)'),
                        borderWidth: selectedChannel.chart_type === 'bar' ? 1 : 2,
                        pointRadius: selectedChannel.chart_type === 'line' ? 3 : 0,
                        pointHoverRadius: selectedChannel.chart_type === 'line' ? 5 : 0,
                        spanGaps: true,
                        tension: 0.1
                    };
                })
            };
        } else {
            // Rendered view mode - show all channels in this chart group
            const datasets = chartGroupChannels.map((channel, channelIndex) => {
                const color = channel.color || DEFAULT_COLORS[channelIndex % DEFAULT_COLORS.length];
                
                // Create data array with proper positioning in the timeline
                const data = new Array(timeLabels.length).fill(null);
                
                // Process non-dependent blocks first
                const independentBlocks = sortedBlocks.filter(block => 
                    !(block.isDependent || (block.dependencies && block.dependencies.length > 0))
                );
                
                independentBlocks.forEach(block => {
                    const channelData = block.data && block.data[channel.id] 
                        ? block.data[channel.id] 
                        : [];
                    
                    if (channelData.length === 0) return;
                    
                    const startDate = parseISO(block.start_hour);
                    const endDate = parseISO(block.end_hour);
                    
                    timeLabels.forEach((label, index) => {
                        const labelDate = parseISO(label);
                        
                        // Check if this label timestamp is within block's time range
                        if (labelDate >= startDate && labelDate <= endDate) {
                            // Calculate relative position in the block's range
                            const hourOffset = Math.floor((labelDate.getTime() - startDate.getTime()) / (60 * 60 * 1000));
                            if (hourOffset >= 0 && hourOffset < channelData.length) {
                                // Only overwrite if the data exists (not null)
                                if (channelData[hourOffset] !== null) {
                                    data[index] = channelData[hourOffset];
                                }
                            }
                        }
                    });
                });
                
                // Then process dependent blocks with their special behaviors
                const dependentBlocks = sortedBlocks.filter(block => 
                    block.isDependent || (block.dependencies && block.dependencies.length > 0)
                );
                
                dependentBlocks.forEach(block => {
                    // Skip if no channel data
                    const channelData = block.data && block.data[channel.id] 
                        ? block.data[channel.id] 
                        : [];
                    
                    if (channelData.length === 0) return;
                    
                    // Basic fill functionality - could be enhanced based on dependencyType
                    const startDate = parseISO(block.start_hour);
                    const endDate = parseISO(block.end_hour);
                    
                    timeLabels.forEach((label, index) => {
                        const labelDate = parseISO(label);
                        
                        // Check if this label timestamp is within block's time range
                        if (labelDate >= startDate && labelDate <= endDate) {
                            // Calculate relative position in the block's range
                            const hourOffset = Math.floor((labelDate.getTime() - startDate.getTime()) / (60 * 60 * 1000));
                            
                            if (hourOffset >= 0 && hourOffset < channelData.length) {
                                // Dependent blocks have different behaviors based on type
                                switch(block.dependencyType) {
                                    case 'extension':
                                        // Extension blocks only fill in null values
                                        if (data[index] === null && channelData[hourOffset] !== null) {
                                            data[index] = channelData[hourOffset];
                                        }
                                        break;
                                    case 'version':
                                        // Version blocks override existing values if they match the referenced order
                                        if (block.referenceOrder !== undefined) {
                                            // This is a version block - it overrides independent blocks with matching order
                                            if (channelData[hourOffset] !== null) {
                                                data[index] = channelData[hourOffset];
                                            }
                                        }
                                        break;
                                    case 'derivative':
                                        // Derivative blocks are typically shown in separate datasets
                                        // (handled elsewhere)
                                        break;
                                    default:
                                        // Default behavior: higher order blocks take precedence
                                        if (channelData[hourOffset] !== null) {
                                            data[index] = channelData[hourOffset];
                                        }
                                }
                            }
                        }
                    });
                });
                
                return {
                    label: `${channel.name} (${channel.unit})`,
                    data,
                    type: channel.chart_type || 'line',
                    borderColor: color,
                    backgroundColor: color.replace('1)', channel.chart_type === 'bar' ? '0.5)' : '0.2)'),
                    borderWidth: channel.chart_type === 'bar' ? 1 : 2,
                    pointRadius: channel.chart_type === 'line' ? 3 : 0,
                    pointHoverRadius: channel.chart_type === 'line' ? 5 : 0,
                    spanGaps: true,
                    tension: 0.1
                };
            });
            
            return {
                labels: timeLabels,
                datasets
            };
        }
    }, [timeLabels, sortedBlocks, viewMode, effectiveSelectedChannelId]);
    
    // Merge default options with custom options
    const getChartOptions = React.useCallback((chartGroup: ChartGroup): ChartOptions => {
        // For selected channel in channel mode
        const selectedChannel = viewMode === 'channel' && effectiveSelectedChannelId
            ? chartGroup.channels.find(c => c.id === effectiveSelectedChannelId)
            : null;
        
        const defaultOptions: ChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            devicePixelRatio: 2,
            scales: {
                x: {
                    type: 'category', // Use category scale instead of time scale
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: selectedChannel ? selectedChannel.unit : 
                              chartGroup.channels.length ? chartGroup.channels[0].unit : ''
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: viewMode === 'channel' && selectedChannel
                        ? `Timeline for ${selectedChannel.name}`
                        : `Chart: ${chartGroup.id !== 'main' ? chartGroup.id : 'Main Chart'}`,
                    font: {
                        size: 20,
                        weight: 400
                    }
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const label = context[0].label;
                            return `Time: ${label}`;
                        },
                        label: function(context) {
                            const dataset = context.dataset;
                            const value = context.raw !== null ? context.raw : 'No data';
                            return `${dataset.label}: ${value}`;
                        }
                    }
                }
            }
        };
        
        return { ...defaultOptions, ...chartOptions };
    }, [chartOptions, viewMode, effectiveSelectedChannelId]);
    
    // UI for changing chart type per channel
    const [showChartTypeControls, setShowChartTypeControls] = React.useState(false);
    
    // Function to toggle chart type for a channel
    const toggleChartType = React.useCallback((channelId: string) => {
        // Find the channel
        const channel = channels.find(c => c.id === channelId);
        if (channel) {
            // Toggle between line and bar
            const newType = channel.chart_type === 'line' ? 'bar' : 'line';
            console.log(`Changing chart type for ${channelId} from ${channel.chart_type} to ${newType}`);
            
            // Call the callback to update the backend
            onChannelChartUpdate(channelId, newType);
        }
    }, [channels, onChannelChartUpdate]);
    
    return (
        <div className="timeline-chart-container">
            {/* Controls Header */}
            <div className="timeline-controls">
                <div className="view-mode-control">
                    <span>View Mode:</span>
                    <select 
                        value={viewMode}
                        onChange={(e) => onViewModeChange(e.target.value)}
                    >
                        <option value="channel">Channel</option>
                        <option value="rendered">Rendered</option>
                    </select>
                </div>
                
                {viewMode === 'channel' && (
                    <div className="channel-selector">
                        <span>Channel:</span>
                        <select
                            value={effectiveSelectedChannelId || ''}
                            onChange={(e) => onChannelSelect(e.target.value)}
                            disabled={channels.length === 0}
                        >
                            {channels.map(channel => (
                                <option key={channel.id} value={channel.id}>
                                    {channel.name} ({channel.unit})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                
                <div className="block-info">
                    <span>Blocks:</span>
                    <span className="block-count">{sortedBlocks.length}</span>
                </div>
                
                <div className="chart-type-controls-toggle">
                    <button 
                        className="chart-type-controls-button"
                        onClick={() => setShowChartTypeControls(!showChartTypeControls)}
                    >
                        {showChartTypeControls ? 'Hide Chart Controls' : 'Show Chart Controls'}
                    </button>
                </div>
            </div>
            
            {/* Chart Type Controls */}
            {showChartTypeControls && (
                <div className="chart-type-controls">
                    <div className="chart-type-controls-header">
                        <h4>Chart Type & Chart Assignment</h4>
                        <p className="chart-type-controls-help">Select chart type for each channel and assign channels to charts</p>
                    </div>
                    <div className="chart-type-controls-items">
                        {channels.map(channel => (
                            <div key={channel.id} className="chart-type-control-item">
                                <span className="channel-name">{channel.name}</span>
                                <div className="chart-type-selectors">
                                    <div className="chart-type-selector">
                                        <label>Type:</label>
                                        <select 
                                            value={channel.chart_type || 'line'} 
                                            onChange={() => toggleChartType(channel.id)}
                                        >
                                            <option value="line">Line</option>
                                            <option value="bar">Bar</option>
                                        </select>
                                    </div>
                                    <div className="chart-assignment-selector">
                                        <label>Chart:</label>
                                        <select
                                            value={channel.chart_id || 'main'}
                                            onChange={(e) => onChannelChartUpdate(channel.id, channel.chart_type || 'line', e.target.value)}
                                        >
                                            <option value="main">Main</option>
                                            <option value="weather">Weather</option>
                                            <option value="energy">Energy</option>
                                            <option value="custom">Custom</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Charts */}
            <div className="chart-wrapper-container" ref={chartContainerRef}>
                {sortedBlocks.length === 0 ? (
                    <div className="no-data-message">
                        No data blocks available. Add data using the <code>add_data_block</code> method.
                    </div>
                ) : isTransitioning ? (
                    <div className="loading-chart mode-transition">
                        {transitionType === 'view-mode' 
                            ? 'Switching view mode...' 
                            : transitionType === 'channel'
                                ? 'Changing selected channel...'
                                : 'Updating chart...'}
                    </div>
                ) : (
                    <div className={`charts-grid ${chartGroups.length > 1 ? 'multi-chart' : ''}`}>
                        {chartGroups.map(chartGroup => {
                            // Skip this chart group if it has no channels in current view mode
                            if (viewMode === 'channel' && 
                                !chartGroup.channels.some(c => c.id === effectiveSelectedChannelId)) {
                                return null;
                            }
                            
                            const chartData = prepareChartData(chartGroup);
                            const options = getChartOptions(chartGroup);
                            
                            return (
                                <div key={`${chartGroup.id}-${chartKeys[chartGroup.id] || 0}`} className="chart-wrapper">
                                    {shouldRenderCharts ? (
                                        <Chart 
                                            key={chartKeys[chartGroup.id] || 0}
                                            type="line" // Base type, individual datasets have their own types
                                            data={chartData} 
                                            options={options} 
                                            ref={(ref) => ref && setChartRef(chartGroup.id, ref)}
                                        />
                                    ) : (
                                        <div className="loading-chart">Loading chart...</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
            {/* Legend for Blocks in Channel Mode */}
            {viewMode === 'channel' && sortedBlocks.length > 0 && (
                <div className="blocks-legend">
                    <h4>Data Blocks</h4>
                    <div className="blocks-list">
                        {sortedBlocks.map((block, index) => {
                            const isDependentBlock = block.isDependent || (block.dependencies && block.dependencies.length > 0);
                            const dependencyClass = isDependentBlock ? 'dependent-block' : '';
                            
                            return (
                                <div key={block.id} className={`block-item ${dependencyClass}`}>
                                    <span 
                                        className="block-color" 
                                        style={{ backgroundColor: DEFAULT_COLORS[index % DEFAULT_COLORS.length] }}
                                    ></span>
                                    <span className="block-name">
                                        {block.name}
                                        {block.referenceOrder !== undefined && (
                                            <span className="reference-order">
                                                {` (ref: ${block.referenceOrder})`}
                                            </span>
                                        )}
                                    </span>
                                    
                                    <span className="block-range">
                                        {format(parseISO(block.start_hour), 'MMM d, HH:00')} - 
                                        {format(parseISO(block.end_hour), 'MMM d, HH:00')}
                                    </span>
                                    
                                    {isDependentBlock && (
                                        <span className="dependency-info">
                                            {block.dependencyType && `${block.dependencyType} of `}
                                            {block.dependencies?.map(depId => {
                                                const depBlock = blocks.find(b => b.id === depId);
                                                return depBlock ? depBlock.name : depId;
                                            }).join(", ")}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
} 