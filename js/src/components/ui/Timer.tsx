import * as React from "react";

interface TimerProps {
    interval: number;
    isActive: boolean;
    uiLabel: string;
    onTick: () => void;
    onToggle: (active: boolean) => void;
}

export function Timer({ interval, isActive, uiLabel, onTick, onToggle }: TimerProps) {
    const [isBlinking, setIsBlinking] = React.useState(false);
    const [showReset, setShowReset] = React.useState(false);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        if (isActive) {
            setShowReset(false);

            const startTime = Date.now();
            
            const tick = () => {
                const elapsed = (Date.now() - startTime) % (interval * 1000);
                
                if (elapsed < 50) {

                    onTick();
                    setIsBlinking(true);
                    setTimeout(() => setIsBlinking(false), 250);
                }
            };


            onTick();
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 250);
            
            intervalRef.current = setInterval(tick, 50);
            
            return () => {

                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                setShowReset(true); // Show reset when timer stops
            };
        } else {

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setIsBlinking(false);
            setShowReset(true); // Show reset when timer is inactive
        }
    }, [isActive, interval, onTick]);

    const handleClick = () => {
        if (showReset) {
            // Reset action
            setShowReset(false);
            onToggle(true);
        } else {
            // Normal toggle
            onToggle(!isActive);
        }
    };

    return (
        <div 
            className="timer-dot"
            onClick={handleClick}
            onMouseEnter={() => {
                if (!isActive) setShowReset(true);
            }}
            style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: showReset ? '#2196F3' : (isBlinking ? '#4CAF50' : '#ddd'),
                cursor: 'pointer',
                transition: 'background-color 0.1s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...(showReset && {
                    '&::after': {
                        content: '↺',
                        color: 'white',
                        fontSize: '14px'
                    }
                })
            }}
        >
            {showReset && "↺"}
        </div>
    );
} 