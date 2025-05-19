"use client";

import React, { createContext, useContext, useState } from "react";

interface LoginModalContextType {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(
  undefined
);

export function LoginModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <LoginModalContext.Provider value={{ showLoginModal, setShowLoginModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  const context = useContext(LoginModalContext);
  if (context === undefined) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }
  return context;
}
