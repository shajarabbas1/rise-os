'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BsEye } from 'react-icons/bs';
import Link from 'next/link';

const CustomFileDropdown = ({ files }: { files: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  console.log(previewUrl, 'this is a previewurl');
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = fileUrl => {
    setSelectedFile(fileUrl);
    setPreviewUrl(fileUrl);
    setIsOpen(false);
  };

  const isImage = url => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
  };

  const isPdf = url => {
    return url.endsWith('.pdf');
  };

  return (
    <div className="w-full">
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="border px-3 py-2 rounded-md w-full flex justify-between items-center bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {selectedFile
              ? isPdf(selectedFile)
                ? `PDF File`
                : 'Image Selected'
              : '-- Choose a file --'}
          </span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-auto">
            <div className="py-1">
              {files.map((fileUrl, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(fileUrl)}
                >
                  {isPdf(fileUrl) ? (
                    <div className="flex text-lg items-center justify-between">
                      <p>Pdf 1 </p>
                      <Link href={fileUrl}>
                        <BsEye size={20} />
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-3 relative">
                        <Image
                          src={fileUrl}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <span>Image {index + 1}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {previewUrl && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Preview:</h3>
          {isImage(previewUrl) ? (
            <div className="relative w-full h-64">
              <Image
                src={previewUrl}
                alt="Selected image preview"
                fill
                className="object-contain rounded-md"
              />
            </div>
          ) : isPdf(previewUrl) ? (
            <div className="border rounded-md p-4 bg-gray-50">
              <p className="mb-2">PDF Document</p>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Open PDF Preview
              </a>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CustomFileDropdown;
