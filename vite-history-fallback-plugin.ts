// Custom Vite plugin to handle client-side routing
// This will prevent 404 errors when refreshing pages on routes other than the root
import type { Plugin, ViteDevServer } from 'vite';

export default function historyFallbackPlugin(): Plugin {
  return {
    name: 'history-fallback',
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use((req, _res, next) => {
          const url = req.url || '';
          // Skip API routes or static assets
          const shouldFallback = !url.includes('.') && !url.startsWith('/api/');
          
          if (shouldFallback) {
            // Rewrite URL to serve index.html
            req.url = '/index.html';
          }
          
          next();
        });
      };
    }
  };
}
