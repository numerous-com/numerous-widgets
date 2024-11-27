type TabsStore = {
    activeTabsMap: { [widgetId: string]: string };
};

const store: TabsStore = {
    activeTabsMap: {}
};

export const getActiveTab = (widgetId: string): string | undefined => {
    return store.activeTabsMap[widgetId];
};

export const setActiveTab = (widgetId: string, tab: string): void => {
    store.activeTabsMap[widgetId] = tab;
}; 