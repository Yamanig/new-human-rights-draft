import { useState, useCallback } from 'react';
import { z } from 'zod';

interface UseFormProps<T> {
  initialValues: T;
  validationSchema: z.ZodSchema<T>;
  onSubmit: (values: T) => Promise<void>;
}

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
}

export function useForm<T>({ initialValues, validationSchema, onSubmit }: UseFormProps<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name: keyof T, value: any) => {
      try {
        const schema = z.object({ [name]: validationSchema.shape[name as string] });
        schema.parse({ [name]: value });
        return '';
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.errors[0].message;
        }
        return 'Invalid value';
      }
    },
    [validationSchema]
  );

  const handleChange = useCallback(
    (name: keyof T, value: any) => {
      setFormState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: value },
        errors: {
          ...prev.errors,
          [name]: validateField(name, value),
        },
      }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setFormState((prev) => ({
        ...prev,
        touched: { ...prev.touched, [name]: true },
        errors: {
          ...prev.errors,
          [name]: validateField(name, prev.values[name]),
        },
      }));
    },
    [validateField]
  );

  const validateForm = useCallback(async () => {
    try {
      await validationSchema.parseAsync(formState.values);
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
        setFormState(prev => ({
          ...prev,
          errors: newErrors as Partial<Record<keyof T, string>>,
          touched: Object.keys(newErrors).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {} as Partial<Record<keyof T, boolean>>
          ),
        }));
      }
      return false;
    }
  }, [validationSchema, formState.values]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const isValid = await validateForm();
        if (!isValid) {
          throw new Error('Form validation failed');
        }

        await onSubmit(formState.values);
        setFormState((prev) => ({
          ...prev,
          errors: {},
          touched: {},
        }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [formState.values, validateForm, onSubmit]
  );

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
    });
  }, [initialValues]);

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}