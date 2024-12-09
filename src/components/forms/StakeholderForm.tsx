import React from 'react';
import { User, Mail, Phone, Building, Tag } from 'lucide-react';
import { useForm } from '../../hooks/useForm';
import { useToast } from '../../hooks/useToast';
import { stakeholderSchema, type StakeholderFormData } from '../../lib/validation/formValidation';
import FormField from '../common/FormField';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import { createStakeholder } from '../../lib/services/stakeholderService';

const initialValues: StakeholderFormData = {
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
    },
    {
      type: 'sms',
      enabled: false,
      frequency: 'immediate',
      categories: ['escalation']
    },
    {
      type: 'in_app',
      enabled: true,
      frequency: 'immediate',
      categories: ['escalation', 'assignment', 'deadline', 'feedback', 'system']
    }
  ]
};

const categories = [
  'escalation',
  'assignment',
  'deadline',
  'feedback',
  'system'
];

export default function StakeholderForm() {
  const { toasts, addToast } = useToast();

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
    initialValues,
    validationSchema: stakeholderSchema,
    onSubmit: async (data) => {
      try {
        await createStakeholder({
          ...data,
          active: true,
          lastActive: new Date().toISOString()
        });
        addToast('success', 'Stakeholder created successfully');
        resetForm();
      } catch (error) {
        addToast('error', 'Failed to create stakeholder');
        console.error('Error creating stakeholder:', error);
      }
    }
  });

  const handleNotificationChange = (index: number, field: string, value: any) => {
    const newPreferences = [...values.notificationPreferences];
    newPreferences[index] = {
      ...newPreferences[index],
      [field]: value
    };
    handleChange('notificationPreferences', newPreferences);
  };

  const handleCategoryToggle = (index: number, category: string) => {
    const preferences = values.notificationPreferences[index];
    const newCategories = preferences.categories.includes(category)
      ? preferences.categories.filter(c => c !== category)
      : [...preferences.categories, category];
    
    handleNotificationChange(index, 'categories', newCategories);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Stakeholder</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            error={errors.name}
            touched={touched.name}
            required
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={values.name}
                onChange={e => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </FormField>

          <FormField
            label="Email"
            error={errors.email}
            touched={touched.email}
            required
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={values.email}
                onChange={e => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </FormField>

          <FormField
            label="Contact Number"
            error={errors.contact}
            touched={touched.contact}
            required
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                value={values.contact}
                onChange={e => handleChange('contact', e.target.value)}
                onBlur={() => handleBlur('contact')}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </FormField>

          <FormField
            label="Department"
            error={errors.department}
            touched={touched.department}
            required
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={values.department}
                onChange={e => handleChange('department', e.target.value)}
                onBlur={() => handleBlur('department')}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </FormField>
        </div>

        <FormField
          label="Role Level"
          error={errors.role}
          touched={touched.role}
          required
        >
          <select
            value={values.role}
            onChange={e => handleChange('role', e.target.value)}
            onBlur={() => handleBlur('role')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="level1">Level 1 - First Response</option>
            <option value="level2">Level 2 - Supervisor</option>
            <option value="level3">Level 3 - Administrator</option>
          </select>
        </FormField>

        <FormField
          label="Area of Responsibility"
          error={errors.area}
          touched={touched.area}
          required
        >
          <input
            type="text"
            value={values.area}
            onChange={e => handleChange('area', e.target.value)}
            onBlur={() => handleBlur('area')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
          
          <div className="space-y-6">
            {values.notificationPreferences.map((pref, index) => (
              <div key={pref.type} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-900 capitalize">
                    {pref.type.replace('_', ' ')} Notifications
                  </h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pref.enabled}
                      onChange={e => handleNotificationChange(index, 'enabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Frequency</label>
                    <select
                      value={pref.frequency}
                      onChange={e => handleNotificationChange(index, 'frequency', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="daily">Daily Digest</option>
                      <option value="weekly">Weekly Summary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Categories
                    </label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={pref.categories.includes(category)}
                            onChange={() => handleCategoryToggle(index, category)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600 capitalize">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Create Stakeholder
          </Button>
        </div>
      </form>
    </div>
  );
}