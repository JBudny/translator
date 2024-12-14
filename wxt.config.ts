import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    action: {
      "default_icon": "icon128.png",
      "default_popup": "index.html",
      "default_title": "Translator",
    },
    icons: {
      "16": "icon16.png",
      "32": "icon32.png",
      "48": "icon48.png",
      "128": "icon128.png",
    },
    name: "Translator",
    permissions: [
      "activeTab",
      "contextMenus",
      "storage",
    ],
  },
  manifestVersion: 3,
});
