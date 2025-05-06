'use client';

import DynamicForm from '@/components/shared/form/Form';
import { formData } from '@/data/form.data';

export default function Form() {
  return <DynamicForm formData={formData.data} />;
}
