/**
 * Guards React.lazy() imports against stale hashed chunks.
 *
 * After a new deploy the previously loaded index references chunk filenames
 * that no longer exist, so the dynamic import rejects and the route blanks
 * out. We retry once after a short delay (covers flaky networks), then force
 * a one-time hard reload so the browser fetches the current asset manifest.
 */
const RELOAD_FLAG = "chunk-reload-attempt";

export function chunkRetry<T>(factory: () => Promise<T>): () => Promise<T> {
  return () =>
    factory().catch(
      () =>
        new Promise<T>((resolve, reject) => {
          setTimeout(() => {
            factory().then(
              (mod) => {
                try {
                  window.sessionStorage?.removeItem(RELOAD_FLAG);
                } catch {
                  /* storage unavailable */
                }
                resolve(mod);
              },
              (err) => {
                if (typeof window === "undefined") {
                  reject(err);
                  return;
                }
                let alreadyReloaded = false;
                try {
                  alreadyReloaded = window.sessionStorage?.getItem(RELOAD_FLAG) === "1";
                  if (!alreadyReloaded) window.sessionStorage?.setItem(RELOAD_FLAG, "1");
                } catch {
                  /* storage unavailable */
                }
                if (!alreadyReloaded) {
                  window.location.reload();
                  return;
                }
                reject(err);
              }
            );
          }, 600);
        })
    );
}
