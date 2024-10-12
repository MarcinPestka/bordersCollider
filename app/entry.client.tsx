import { CacheProvider } from '@emotion/react';
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import createEmotionCache from './emotionCache';
import { store } from "./root";

const cache = createEmotionCache();

startTransition(() => {
  hydrateRoot(
    document,
    <CacheProvider value={cache}>
      <StrictMode>
        <Provider store={store} >
          <RemixBrowser />
        </Provider>
      </StrictMode>
    </CacheProvider>
  );
});
