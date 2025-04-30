'use client';

import DynamicForm from '@/components/shared/form/Form';
import { formData } from '@/data/form.data';

const Page = () => <DynamicForm formData={formData.data} />;

export default Page;
