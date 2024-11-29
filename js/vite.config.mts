import { defineConfig } from "vite";
import anywidget from "@anywidget/vite";
import postcssCssVariables from 'postcss-css-variables';

// Get the widget name from environment variable
const widgetName = process.env.WIDGET_NAME || 'ButtonWidget';

// Get current environment
const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
	plugins: [anywidget()],
	build: {
		outDir: "../python/src/widgets/static",
			lib: {
				entry: [`src/components/widgets/${widgetName}.tsx`],
				formats: ["es"],
			},
			rollupOptions: {
				output: {
					assetFileNames: "style.css",
					entryFileNames: "[name].mjs",
					chunkFileNames: "[name]-[hash].mjs",
				},
			},
			cssCodeSplit: false,
			minify: true,
			cssMinify: isDevelopment ? false : {
				preset: ['default', {
					cssVariables: false
				}]
			}
	},
	css: {
		postcss: {
			plugins: [
				// Only process CSS variables in production
				!isDevelopment && postcssCssVariables({
					preserve: false
				})
			].filter(Boolean)
		}
	},
	define: {
		'process.env': {},
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
	}
});