// Custom Vite plugin to handle client-side routing
// This will prevent 404 errors when refreshing pages on routes other than the root

export default function historyFallbackPlugin() {
  return {
    name: 'history-fallback',
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          // Skip API routes or static assets
          const shouldFallback = !req.url.includes('.') && !req.url.startsWith('/api/');
          
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
