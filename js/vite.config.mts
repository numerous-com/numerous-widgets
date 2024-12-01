import { defineConfig } from "vite";
import anywidget from "@anywidget/vite";
import postcssCssVariables from 'postcss-css-variables';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import purgecss from 'postcss-purgecss';

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
					assetFileNames: `${widgetName}.css`,
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
				postcssImport(),
				postcssUrl(),
				// Only process CSS variables in production
				!isDevelopment && postcssCssVariables({
					preserve: false
				}),
				// Add PurgeCSS to remove unused styles
				!isDevelopment && purgecss({
					content: [
						`./src/components/widgets/${widgetName}.tsx`,
						'./src/**/*.{js,jsx,ts,tsx}',
					],
					defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
				})
			].filter(Boolean)
		}
	},
	define: {
		'process.env': {},
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
	}
});