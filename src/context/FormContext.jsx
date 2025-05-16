// src/context/FormContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormData = () => useContext(FormContext);

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    company_name: '',
    company_nature_of_business: '',
    company_size: '',
    company_website: '',
    context: '',
    selected_plan: '',
    payment_method: '',
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}
