import { useState } from 'react';
import { useForm } from './useForm';
import { useToast } from './useToast';
import { stakeholderSchema, type StakeholderFormData } from '../validation/formValidation';
import { createStakeholder } from '../lib/services/stakeholderService';
import { setNotificationPreferences } from '../lib/services/notificationService';

export function useStakeholderForm() {
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      role: 'level1',
      area: '',
      department: '',
      contact: '',
      notificationPreferences: [
        {
          type: 'email',
          enabled: true,
          frequency: 'immediate',
          categories: ['escalation', 'assignment', 'deadline']
        }
      ]
    } as StakeholderFormData,
    validationSchema: stakeholderSchema,
    onSubmit: async (data) => {
      try {
        setIsProcessing(true);

        // Create stakeholder
        const stakeholder = await createStakeholder({
          name: data.name,
          email: data.email,
          role: data.role,
          area: data.area,
          department: data.department,
          contact: data.contact
        });

        // Set notification preferences
        await setNotificationPreferences(stakeholder.id, data.notificationPreferences);

        addToast('success', 'Stakeholder created successfully');
        resetForm();
      } catch (error) {
        addToast('error', 'Failed to create stakeholder');
        console.error('Error creating stakeholder:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  });

  return {
    values,
    errors,
    touched,
    isSubmitting: isSubmitting || isProcessing,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
}