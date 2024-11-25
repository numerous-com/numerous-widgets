import { defineConfig } from "vite";
//import react from "@vitejs/plugin-react";
import anywidget from "@anywidget/vite";

export default defineConfig({
	plugins: [anywidget()],
	build: {
		outDir: "src/widget/static",
		lib: {
			entry: ["js/components/ProjectMenuWidget.tsx"],
			formats: ["es"],
		},
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					// Place CSS files in the same directory as the JS
					if (assetInfo.name.endsWith('.css')) {
						return '[name][extname]';
					}
					return assetInfo.name;
				},
			},
		},
	},
	define: {
		'process.env': {},
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
	}
});