# Request Memoization Example

This example demonstrates **Request Memoization** in Next.js.

Request Memoization is an optimization that caches the results of `fetch` requests (and some other functions) that occur within a single React render pass on the server or a single execution of a Route Handler. This means if you call the same `fetch` request with the same arguments multiple times in different components during one server-rendering lifecycle, the actual HTTP request will only be made once. Subsequent calls will reuse the memoized result.

This is distinct from the Data Cache or Full Route Cache, as its scope is limited to the duration of a single incoming request being processed by the server.

## How to Run

1.  **Navigate to this directory:**

    ```bash
    cd request-memoization
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

4.  **Start the application:**
    ```bash
    pnpm start
    ```

Open your browser to `http://localhost:3000`.

To observe Request Memoization:

- The example will likely have components or server-side logic that call the same `fetch` endpoint multiple times within a single request-response cycle.
- Check the server-side logs (the terminal where you ran `pnpm start`). You should see evidence that even if the `fetch` call is invoked multiple times in the code (e.g., in different components rendered for the same page request), the underlying HTTP request to an external service (or a mock service if provided) is only made once per unique request during that cycle.

For more details on Request Memoization, refer to the [official Next.js documentation](https://nextjs.org/docs/app/building-your-application/caching#request-memoization).
