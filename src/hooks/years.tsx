import axios from 'axios';
import React, { createContext, ReactNode, SetStateAction, useContext, useState } from 'react';

import { Year } from '../types/Year';

interface YearsContextData {
  years: Year[] | undefined;
  setYears: React.Dispatch<SetStateAction<Year[] | undefined>>;
  loadYears: (brandId: string, modelId: string) => Promise<void>;
}

const initialYearsContext = {};

const YearsContext = createContext<YearsContextData>(initialYearsContext as YearsContextData);

interface YearsProviderProps {
  children: ReactNode;
}

function YearsProvider({ children }: YearsProviderProps): JSX.Element {
  const [years, setYears] = useState<Year[] | undefined>(undefined);

  const loadYears = async (brandId: string, modelId: string): Promise<void> => {
    try {
      const response = await axios.get<Year[]>(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${modelId}/anos`,
      );

      if (response) setYears(response.data);
    } catch (error) {
    }
  };

  return <YearsContext.Provider value={{ years, setYears, loadYears }}>{children}</YearsContext.Provider>;
}

function useYears(): YearsContextData {
  const context = useContext(YearsContext);

  if (!context) {
    throw new Error('Error');
  }

  return context;
}

export { YearsProvider, useYears };
