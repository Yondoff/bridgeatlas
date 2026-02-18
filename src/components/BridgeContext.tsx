"use client";

import { createContext, useContext } from "react";

const BridgeSlugContext = createContext<string | undefined>(undefined);

export function BridgeProvider(props: {
  bridgeSlug?: string;
  children: React.ReactNode;
}) {
  return (
    <BridgeSlugContext.Provider value={props.bridgeSlug}>
      {props.children}
    </BridgeSlugContext.Provider>
  );
}

export function useBridgeSlug() {
  return useContext(BridgeSlugContext);
}
