import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import { store } from "./root";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <Provider store={store} >
        <RemixBrowser />
      </Provider>
    </StrictMode>
  );
});
