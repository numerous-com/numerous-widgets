import { defineConfig } from "vite";
//import react from "@vitejs/plugin-react";
import anywidget from "@anywidget/vite";

export default defineConfig({
	plugins: [anywidget()],
	build: {
		outDir: "../python/src/widgets/static",
		lib: {
			entry: ["src/components/ProjectMenuWidget.tsx", "src/components/widgets/NumberInputWidget.tsx"],
			formats: ["es"],
		},
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.endsWith('.css')) {
						return '[name][extname]';
					}
					return assetInfo.name ?? 'unknown';
				},
			},
		},
	},
	define: {
		'process.env': {},
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
	}
});