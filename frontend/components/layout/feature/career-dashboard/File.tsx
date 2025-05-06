import FileUpload from '@/components/shared/file-upload/FileUpload';
import Row from '@/components/shared/row';
import { CardDescription, CardHeading } from '@/components/shared/typography';
import { useState } from 'react';

const File = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = () => {
    if (files.length < 1) {
      console.log('Please select file first');

      return;
    }
    console.log('Upload triggered');
    setFiles([]);
  };

  return (
    <Row className="w-full bg-white rounded-3xl p-6 flex-col items-start">
      <CardHeading title="Upload Data Audit" />
      <CardDescription
        className="mb-8"
        title="Submit necessary documents and record for audit purposes. Ensure files are accurate, relevant, and in an accepted format."
      />

      <FileUpload
        uploadedFiles={files}
        onFileSelect={selectedFiles => {
          setFiles(prev => [...prev, ...selectedFiles]);
        }}
        onDeleteClick={fileName =>
          setFiles(prev => prev.filter(file => file.name !== fileName))
        }
        onUploadClick={handleFileUpload}
        onError={msg => console.error(msg)}
      />
    </Row>
  );
};
export default File;
