import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import '../../css/styles.scss';

function URLParamsWidget() {
    // Browser-writable states (for sending to Python)
    const [browserQueryParams, setBrowserQueryParams] = useModelState<Record<string, string>>("browser_query_params");
    const [browserPathSegments, setBrowserPathSegments] = useModelState<string[]>("browser_path_segments");
    const [browserCurrentURL, setBrowserCurrentURL] = useModelState<string>("browser_current_url");
    const [browserBaseURL, setBrowserBaseURL] = useModelState<string>("browser_base_url");

    // Keep track of current state to prevent unnecessary updates
    const currentState = React.useRef({
        queryParams: {},
        pathSegments: [] as string[],
        currentURL: "",
        baseURL: ""
    });

    // Function to check if two objects are deeply equal
    const isEqual = React.useCallback((a: any, b: any): boolean => {
        if (a === b) return true;
        if (typeof a !== typeof b) return false;
        if (typeof a !== 'object' || a === null || b === null) return false;
        if (Array.isArray(a) !== Array.isArray(b)) return false;
        
        if (Array.isArray(a)) {
            if (a.length !== b.length) return false;
            return a.every((item, index) => isEqual(item, b[index]));
        }
        
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        
        return keysA.every(key => isEqual(a[key], b[key]));
    }, []);

    // Function to parse query parameters from URL
    const parseQueryParams = React.useCallback(() => {
        try {
            const params: Record<string, string> = {};
            const searchParams = new URLSearchParams(window.location.search);
            
            // Convert URLSearchParams to plain object
            for (const [key, value] of searchParams.entries()) {
                params[key] = value;
            }

            console.log('Parsed query params:', params); // Debug log
            return params;
        } catch (error) {
            console.error('Error parsing query parameters:', error);
            return {};
        }
    }, []);

    // Function to parse path segments (slugs) from URL
    const parsePathSegments = React.useCallback(() => {
        try {
            const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
            const segments = path ? path.split('/') : [];
            console.log('Parsed path segments:', segments); // Debug log
            return segments;
        } catch (error) {
            console.error('Error parsing path segments:', error);
            return [];
        }
    }, []);

    // Function to update state if changed
    const updateState = React.useCallback((
        params: Record<string, string>,
        segments: string[],
        fullURL: string,
        base: string
    ) => {
        let hasChanges = false;

        // Debug logs
        console.log('Current state:', currentState.current);
        console.log('New params:', params);
        console.log('New segments:', segments);
        console.log('New URL:', fullURL);
        console.log('New base:', base);

        if (!isEqual(params, currentState.current.queryParams)) {
            console.log('Sending query params to Python:', params); // Debug log
            currentState.current.queryParams = { ...params };
            setBrowserQueryParams(params);
            hasChanges = true;
            console.log('Query params updated'); // Debug log
        }

        if (!isEqual(segments, currentState.current.pathSegments)) {
            currentState.current.pathSegments = [...segments];
            setBrowserPathSegments(segments);
            hasChanges = true;
            console.log('Path segments updated'); // Debug log
        }

        if (fullURL !== currentState.current.currentURL) {
            currentState.current.currentURL = fullURL;
            setBrowserCurrentURL(fullURL);
            hasChanges = true;
            console.log('Current URL updated'); // Debug log
        }

        if (base !== currentState.current.baseURL) {
            currentState.current.baseURL = base;
            setBrowserBaseURL(base);
            hasChanges = true;
            console.log('Base URL updated'); // Debug log
        }
        console.log('Has changes:', hasChanges); // Debug log

        return hasChanges;
    }, [setBrowserQueryParams, setBrowserPathSegments, setBrowserCurrentURL, setBrowserBaseURL, isEqual]);

    // Function to update all URL-related state
    const updateAllURLState = React.useCallback(() => {
        console.log('Updating all URL state...'); // Debug log
        console.log('Current location:', window.location.href); // Debug log

        const params = parseQueryParams();
        const segments = parsePathSegments();
        const fullURL = window.location.href;
        const base = `${window.location.protocol}//${window.location.host}`;

        updateState(params, segments, fullURL, base);
    }, [parseQueryParams, parsePathSegments, updateState]);

    // Monitor URL changes
    React.useEffect(() => {
        console.log('Setting up URL monitoring...'); // Debug log

        // Create a custom event for history state changes
        const historyPushState = history.pushState;
        const historyReplaceState = history.replaceState;

        history.pushState = function(...args) {
            historyPushState.apply(history, args);
            window.dispatchEvent(new Event('locationchange'));
        };

        history.replaceState = function(...args) {
            historyReplaceState.apply(history, args);
            window.dispatchEvent(new Event('locationchange'));
        };

        const handleURLChange = () => {
            console.log('URL change detected'); // Debug log
            updateAllURLState();
        };

        // Initial load
        handleURLChange();

        // Add event listeners for URL changes
        window.addEventListener('popstate', handleURLChange);
        window.addEventListener('hashchange', handleURLChange);
        window.addEventListener('locationchange', handleURLChange);
        
        return () => {
            window.removeEventListener('popstate', handleURLChange);
            window.removeEventListener('hashchange', handleURLChange);
            window.removeEventListener('locationchange', handleURLChange);
            history.pushState = historyPushState;
            history.replaceState = historyReplaceState;
        };
    }, [updateAllURLState]);

    return null;
}

export default {
    render: createRender(URLParamsWidget)
} 