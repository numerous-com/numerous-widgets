import * as React from "react";
import { Tooltip } from './Tooltip';

interface DropDownProps {
    selected_key: string;
    options: string[];
    uiLabel: string;
    uiTooltip: string;
    onChange: (selected_key: string) => void;
    fitToContent: boolean;
    labelInline: boolean;
}

export function DropDown({ 
    selected_key, 
    options, 
    uiLabel, 
    uiTooltip, 
    onChange,
    fitToContent,
    labelInline
}: DropDownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Click outside handler
    /*React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);*/

    const handleOptionClick = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`input-container dropdown-input-container ${fitToContent ? 'fit-to-content' : ''} ${labelInline ? 'label-inline' : ''}`}>
            {!labelInline && (
                <label className="input-label dropdown-label">
                    <span className="string-label-text">{uiLabel}</span>
                    {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                </label>
            )}
            <div className="input-wrapper" ref={containerRef}>
                {labelInline && (
                    <label className="input-label dropdown-label">
                        <span className="string-label-text">{uiLabel}</span>
                        {uiTooltip && <Tooltip tooltip={uiTooltip} />}
                    </label>
                )}
                <div 
                    className="custom-select" 
                    tabIndex={0}
                    onClick={toggleDropdown}
                >
                    <div className="selected-value">{selected_key}</div>
                    <div className="dropdown-arrow"></div>
                </div>
                {isOpen && (
                    <div className="options-container">
                        {options.map(option => (
                            <div
                                key={option}
                                className={`option ${option === selected_key ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
