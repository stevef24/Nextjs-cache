# Data Cache Example

This example demonstrates the **Data Cache** in Next.js.

The Data Cache is a persistent cache that stores the results of `fetch` requests (and other data fetching functions) across incoming server requests and deployments. This is particularly useful for data that doesn't change frequently.

## How to Run

**IMPORTANT:** This example requires a local mock server to be running to provide the API endpoints for data fetching. You must start this server _before_ building and starting the Next.js application.

1.  **Start the Mock Server:**

    - Navigate to the server directory within this example:
      ```bash
      cd data-cache/server
      ```
      (If you are in the root directory, otherwise navigate accordingly.)
    - Install server dependencies (if not already done):
      ```bash
      pnpm install
      ```
    - Start the mock server:
      ```bash
      pnpm start
      ```
      This will typically start the mock API server on `http://localhost:3001`.

2.  **Run the Next.js Application:**
    - In a **new terminal window/tab**, navigate to the `data-cache` directory (if you're not already there from the root):
      ```bash
      cd data-cache
      ```
      (Or `cd ..` if you are in `data-cache/server`)
    - Install Next.js app dependencies (if you haven't already for this project):
      ```bash
      pnpm install
      ```
    - Build the application:
      ```bash
      pnpm build
      ```
    - Start the application:
      ```bash
      pnpm start
      ```

Open your browser to `http://localhost:3000`. When you first load a page that fetches data, it will hit the mock API. Subsequent requests for the same data (within its cache lifetime) should be served from the Data Cache, and you won't see new requests to the mock API for that data.

To observe caching behavior:

- Check the console output of the mock server (`localhost:3001`) to see when requests are made.
- Refresh the page in the browser (`localhost:3000`) or navigate away and back. If the data is cached, you shouldn't see new log entries in the mock server console for that specific data endpoint.

For more details on the Data Cache, refer to the [official Next.js documentation](https://nextjs.org/docs/app/building-your-application/caching#data-cache).
