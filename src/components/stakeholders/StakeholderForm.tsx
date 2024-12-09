import React, { useState } from 'react';
import { User, Mail, Phone, Building, Tag, Bell } from 'lucide-react';
import type { Stakeholder, StakeholderCategory, NotificationPreference } from '../../types';

const categories: StakeholderCategory[] = [
  'field_officer',
  'investigator',
  'supervisor',
  'administrator',
  'legal_expert',
  'medical_professional',
  'social_worker',
  'psychologist',
  'human_rights_expert'
];

const defaultNotificationPreferences: NotificationPreference[] = [
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
];

export default function StakeholderForm() {
  const [formData, setFormData] = useState<Partial<Stakeholder>>({
    role: 'level1',
    active: true,
    notificationPreferences: defaultNotificationPreferences
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'notifications'>('basic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Stakeholder data:', formData);
  };

  const formatCategoryLabel = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('basic')}
            className={`py-4 px-6 text-sm font-medium ${
              activeTab === 'basic'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <User className="inline-block h-4 w-4 mr-2" />
            Basic Information
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-6 text-sm font-medium ${
              activeTab === 'notifications'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Bell className="inline-block h-4 w-4 mr-2" />
            Notification Preferences
          </button>
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {activeTab === 'basic' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.contact || ''}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role Level</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as Stakeholder['role'] })}
              >
                <option value="level1">Level 1 - First Response</option>
                <option value="level2">Level 2 - Supervisor</option>
                <option value="level3">Level 3 - Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  required
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as StakeholderCategory })}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {formatCategoryLabel(category)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Area of Responsibility</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.area || ''}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Supervisor</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.supervisor || ''}
                onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
              >
                <option value="">Select a supervisor</option>
                <option value="sup1">John Doe (Level 2)</option>
                <option value="sup2">Jane Smith (Level 3)</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {formData.notificationPreferences?.map((pref, index) => (
              <div key={pref.type} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 capitalize">
                    {pref.type.replace('_', ' ')} Notifications
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pref.enabled}
                      onChange={(e) => {
                        const newPrefs = [...(formData.notificationPreferences || [])];
                        newPrefs[index] = { ...pref, enabled: e.target.checked };
                        setFormData({ ...formData, notificationPreferences: newPrefs });
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Frequency</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={pref.frequency}
                      onChange={(e) => {
                        const newPrefs = [...(formData.notificationPreferences || [])];
                        newPrefs[index] = { ...pref, frequency: e.target.value as NotificationPreference['frequency'] };
                        setFormData({ ...formData, notificationPreferences: newPrefs });
                      }}
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
                      {['escalation', 'assignment', 'deadline', 'feedback', 'system'].map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={pref.categories.includes(category as any)}
                            onChange={(e) => {
                              const newPrefs = [...(formData.notificationPreferences || [])];
                              const categories = e.target.checked
                                ? [...pref.categories, category]
                                : pref.categories.filter(c => c !== category);
                              newPrefs[index] = { ...pref, categories };
                              setFormData({ ...formData, notificationPreferences: newPrefs });
                            }}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600 capitalize">
                            {category.replace('_', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Save Stakeholder
          </button>
        </div>
      </form>
    </div>
  );
}