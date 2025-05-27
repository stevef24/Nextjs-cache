# Client-Router Cache Example

This example demonstrates the **Client-side Router Cache** in Next.js.

The Client-side Router Cache stores the payload of visited routes in the browser. This allows for faster navigation between pages as Next.js can reuse the cached data instead of re-fetching it from the server.

## How to Run

1.  **Navigate to this directory:**

    ```bash
    cd client-router-cache
    ```

    (If you are in the root directory, otherwise navigate accordingly.)

2.  **Install dependencies (if you haven't already for this project):**

    ```bash
    pnpm install
    ```

3.  **Build the application:**

    ```bash
    pnpm build
    ```

4.  **Start the application:**
    ```bash
    pnpm start
    ```

Open your browser to `http://localhost:3000` and navigate between different pages. Observe the network requests in your browser's developer tools. You should see that subsequent visits to a page do not trigger new data fetches for already visited routes, showcasing the client-side cache in action.

For more details on the Client-side Router Cache, refer to the [official Next.js documentation](https://nextjs.org/docs/app/building-your-application/caching#router-cache).
