export type MoosendSubscribePayload = {
  email: string;
};

declare global {
  interface Window {
    mootrack?: (...args: unknown[]) => void;
  }
}

export const subscribeToMoosendList = async (
  payload: MoosendSubscribePayload
): Promise<void> => {
  if (import.meta.env.DEV) {
    return;
  }

  const response = await fetch("/api/moosend-subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Moosend subscribe failed");
  }
};

export const trackMoosendSignup = (email: string): void => {
  if (import.meta.env.DEV) {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.mootrack !== "function") {
    return;
  }

  window.mootrack("identify", email);
  window.mootrack("trackPageView");
};
