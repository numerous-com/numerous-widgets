import { useState } from 'react';

export const useModelState = jest.fn().mockImplementation(
  (model: any, attribute: string, defaultValue: any) => {
    const [value, setValue] = useState(defaultValue);
    return [value, setValue];
  }
); 