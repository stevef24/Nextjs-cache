# Full Route Cache Example

This example demonstrates the **Full Route Cache** in Next.js.

The Full Route Cache automatically caches statically rendered routes (or pages) on the server. This means that for subsequent requests to the same page, Next.js can serve the cached HTML and assets directly, leading to very fast response times.

This cache is particularly effective for pages that are entirely static or can be pre-rendered at build time or on-demand and then cached.

## How to Run

1.  **Navigate to this directory:**

    ```bash
    cd full-route-cache
    ```

    (If you are in the root directory, otherwise navigate accordingly.)

2.  \*\*Install dependencies (if you haven't already for this project):

    ```bash
    pnpm install
    ```

3.  **Build the application:**

    ```bash
    pnpm build
    ```

    During the build process, Next.js will identify and pre-render static routes.

4.  **Start the application in production mode:**
    ```bash
    pnpm start
    ```
    It's important to run `pnpm start` (which serves the production build) to observe the Full Route Cache, as it's primarily a production optimization.

Open your browser to `http://localhost:3000`. Navigate to different static pages in the example.

To observe the caching:

- The initial load of a static page might involve rendering, but subsequent visits (even after closing and reopening the browser, or by different users if the cache is shared at the CDN/server level) should be served much faster from the cache.
- You can inspect the network headers or use browser developer tools to see if pages are being served from a cache (e.g., looking for cache-related headers or very fast load times without server processing indicators).

For more details on the Full Route Cache, refer to the [official Next.js documentation](https://nextjs.org/docs/app/building-your-application/caching#full-route-cache).
