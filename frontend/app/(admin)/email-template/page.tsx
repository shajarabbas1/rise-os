'use client';
import React from 'react';
import { emailTemplateData } from '@/data/email-temlate.data';
import { IEmailTemplate } from '@/types/email-template.type';
import { useRouter } from 'next/navigation';

const EmailTemplateRow = ({ template }: { template: IEmailTemplate }) => {
  const router = useRouter();
  const handleDelete = () => {
    console.log(`Delete template: ${template.id}`);
    // Implement delete logic here
  };

  const handleView = () => {
    console.log(`View template: ${template.id}`);
  };

  const handleEdit = () => {
    router.push(`/email-template/${template.id}`);
    console.log(`Edit template: ${template.id}`);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {template.subject}
        </h3>
        <p className="text-sm text-gray-600">Group: {template.group}</p>
        <p className="text-sm text-gray-600">
          Status: {template.archived ? 'Archived' : 'Active'}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
        <button
          onClick={handleView}
          className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
        >
          View
        </button>
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const EmailTemplateForm = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Email Templates
        </h1>
        <div className="space-y-4">
          {emailTemplateData.map(template => (
            <EmailTemplateRow key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateForm;
// 'use client';
// import { emailTemplateData } from '@/data/email-temlate.data';
// import React from 'react';
// // import { IEmailTemplate } from '@/types/email-template.type';

// const EmailTemplate = () => {
//   const handleDelete = (id: string) => {
//     console.log(`Delete email with ID: ${id}`);
//   };

//   const handleView = (id: string) => {
//     console.log(`View email with ID: ${id}`);
//   };

//   const handleEdit = (id: string) => {
//     console.log(`Edit email with ID: ${id}`);
//   };
//   return (
//     <div>
//       <h1>Email Template</h1>
//       <div>
//         {emailTemplateData.map(email => (
//           <div
//             key={email.id}
//             style={{
//               border: '1px solid #ccc',
//               padding: '10px',
//               marginBottom: '10px',
//             }}
//           >
//             <div>
//               <strong>Subject:</strong> {email.subject}
//             </div>
//             <div>
//               <strong>Group:</strong> {email.group}
//             </div>
//             <div>
//               <strong>Archived:</strong> {email.archived ? 'Yes' : 'No'}
//             </div>
//             <div>
//               <button onClick={() => handleDelete(email.id)}>Delete</button>
//               <button onClick={() => handleView(email.id)}>View</button>
//               <button onClick={() => handleEdit(email.id)}>Edit</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default EmailTemplate;
