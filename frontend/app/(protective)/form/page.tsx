'use client';
import DynamicForm from '@/components/shared/form/Form';
import { formData } from '@/data/form.data';
export default function Form() {
  //   const response = await fetch(
  //     'http://192.168.10.6:5000/form/34c86666-afc2-4f71-8363-7da6f123c534',
  //   );

  //   console.log(await response.json(), 'this is a response');

  return (
    <div>
      <DynamicForm formData={formData.data} />
    </div>
  );
}
