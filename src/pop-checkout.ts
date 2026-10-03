// Browser-only bridge. No merchant secret, signing, order pricing or paid writes.
// Do not load the script or expose this UI until commerce/merchant gates pass.
export const POP_SCRIPT_URL = "https://app-prod.duitku.com/lib/js/duitku.js";
export type PopCheckout = {
  process(reference: string, options: {
    defaultLanguage: "id";
    successEvent: () => void;
    pendingEvent: () => void;
    errorEvent: () => void;
    closeEvent: () => void;
  }): void;
};

export async function loadProductionPop(document: Document): Promise<PopCheckout> {
  const view = document.defaultView as (Window & { checkout?: PopCheckout }) | null;
  if (!view) throw new Error("POP_VIEW_UNAVAILABLE");
  if (view.checkout?.process) return view.checkout;
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = POP_SCRIPT_URL;
    script.async = true;
    script.referrerPolicy = "no-referrer";
    const timeout = setTimeout(() => {
      script.remove();
      reject(new Error("POP_SCRIPT_UNAVAILABLE"));
    }, 8000);
    script.onload = () => {
      clearTimeout(timeout);
      if (view.checkout?.process) resolve(view.checkout);
      else reject(new Error("POP_SCRIPT_UNAVAILABLE"));
    };
    script.onerror = () => {
      clearTimeout(timeout);
      script.remove();
      reject(new Error("POP_SCRIPT_UNAVAILABLE"));
    };
    document.head.appendChild(script);
  });
}

// Caller obtains reference from an authorized persisted Core payment attempt.
// All JS outcomes only request a server-status refresh, including "success".
export function launchPopCheckout(reference: string, checkout: PopCheckout,
  refreshServerStatus: () => Promise<void>, onRefreshUnavailable: () => void) {
  if (!/^[A-Za-z0-9_-]{1,255}$/.test(reference))
    throw new Error("INVALID_PAYMENT_REFERENCE");
  const refresh = () => {
    void Promise.resolve().then(refreshServerStatus).catch(onRefreshUnavailable);
  };
  checkout.process(reference, {
    defaultLanguage: "id",
    successEvent: refresh,
    pendingEvent: refresh,
    errorEvent: refresh,
    closeEvent: refresh,
  });
}
