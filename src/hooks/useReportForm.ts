import { useState } from 'react';
import { useForm } from './useForm';
import { useToast } from './useToast';
import { reportSchema, type ReportFormData } from '../lib/validation/reportValidation';
import { createReport, uploadEvidence } from '../lib/services/reportService';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'video/mp4',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const initialValues: ReportFormData = {
  title: '',
  description: '',
  location: '',
  incidentDate: '',
  isAnonymous: false,
  reporterName: null,
  reporterContact: null,
  evidence: []
};

export function useReportForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit: submit,
    resetForm
  } = useForm({
    initialValues,
    validationSchema: reportSchema,
    onSubmit: async (data) => {
      try {
        setIsUploading(true);
        
        // Upload files first
        const evidencePromises = files.map(async (file) => {
          const url = await uploadEvidence(file);
          return {
            id: crypto.randomUUID(),
            type: file.type.startsWith('image/') ? 'image' :
                  file.type.startsWith('video/') ? 'video' : 'document',
            name: file.name,
            url
          };
        });

        const uploadedEvidence = await Promise.all(evidencePromises);
        
        // Create report with evidence
        await createReport({
          ...data,
          evidence: uploadedEvidence
        });

        resetForm();
        setFiles([]);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error submitting report:', error);
        throw error;
      } finally {
        setIsUploading(false);
      }
    }
  });

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'File type not supported';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 10MB limit';
    }
    return null;
  };

  const handleFileChange = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    const validFiles: File[] = [];
    const errors: string[] = [];

    newFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      errors.forEach(error => addToast('error', error));
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    return submit(e);
  };

  return {
    values,
    errors,
    touched,
    files,
    isSubmitting,
    isUploading,
    handleChange,
    handleBlur,
    handleSubmit,
    handleFileChange,
    removeFile,
    resetForm
  };
}