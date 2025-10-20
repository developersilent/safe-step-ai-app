import { createContext, ReactNode, useContext, useState } from "react";

interface LangContextType {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const LanguageContext = createContext<LangContextType | undefined>(undefined);

export default function LanguageContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const LangContext = useContext(LanguageContext);
  if (!LangContext) {
    throw new Error(
      "useLanguageContext must be used within a LanguageContextProvider",
    );
  }
  return LangContext;
}
