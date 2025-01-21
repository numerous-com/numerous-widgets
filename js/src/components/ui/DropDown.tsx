import * as React from "react";
import { Tooltip } from './Tooltip';

interface DropDownProps {
    selected_key: string;
    options: string[];
    uiLabel: string;
    uiTooltip: string;
    onChange: (selected_key: string) => void;
    fitToContent: boolean;
}

export function DropDown({ 
    selected_key, 
    options, 
    uiLabel, 
    uiTooltip, 
    onChange,
    fitToContent
}: DropDownProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const optionsRef = React.useRef<HTMLDivElement>(null);

    // Add click outside handler
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && 
                !dropdownRef.current.contains(event.target as Node) &&
                optionsRef.current && 
                !optionsRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`dropdown-container ${fitToContent ? 'fit-to-content' : ''}`}>
            <label className="dropdown-label">
                <span>{uiLabel}</span>
                {uiTooltip && <Tooltip tooltip={uiTooltip} />}
            </label>
            <div 
                className="select-wrapper-dropdown"
                //style={{ zIndex: 1 }}
            >
                <div 
                    ref={dropdownRef}
                    className="custom-select" 
                    tabIndex={0}
                    onClick={toggleDropdown}
                >
                    <div className="selected-value">{selected_key}</div>
                    <div className="dropdown-arrow"></div>
                </div>
                <div 
                    ref={optionsRef}
                    className="options-container"
                    style={{ display: isOpen ? 'block' : 'none' }}
                >
                    {options.map(option => (
                        <div
                            key={option}
                            className={`option ${option === selected_key ? 'selected' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOptionClick(option);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
