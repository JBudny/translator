import { setupContentScript } from "@/content-script";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_end",
  main() {
    setupContentScript();
  },
});
