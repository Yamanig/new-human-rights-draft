import { useState, useCallback } from 'react';
import { z } from 'zod';

export function useFormValidation<T extends object>(schema: z.ZodSchema<T>) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (name: keyof T, value: any) => {
      try {
        schema.pick({ [name]: true }).parse({ [name]: value });
        setErrors(prev => ({ ...prev, [name]: undefined }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
        }
      }
    },
    [schema]
  );

  const validateForm = useCallback(
    (values: T) => {
      try {
        schema.parse(values);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors = error.errors.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.path[0]]: curr.message,
            }),
            {}
          );
          setErrors(newErrors);
        }
        return false;
      }
    },
    [schema]
  );

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    validateForm,
    handleBlur,
    resetValidation,
  };
}