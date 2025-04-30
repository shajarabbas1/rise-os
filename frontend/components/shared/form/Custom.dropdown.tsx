'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BsEye, BsArrowDown } from 'react-icons/bs';
import Link from 'next/link';
import IconButton from '../button';
import Row from '../row';
import { CardDescription, SectionHeading } from '../typography';

interface CustomDropdownProps {
  files: string[];
}
const CustomFileDropdown: React.FC<CustomDropdownProps> = ({ files }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (fileUrl: string) => {
    setSelectedFile(fileUrl);
    setPreviewUrl(fileUrl);
    setIsOpen(false);
  };

  const isImage = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null;
  };

  const isPdf = (url: string) => {
    return url.endsWith('.pdf');
  };

  return (
    <div className="w-full">
      <div className="relative" ref={dropdownRef}>
        <IconButton
          title={
            selectedFile
              ? isPdf(selectedFile)
                ? `PDF File`
                : 'Image Selected'
              : 'Choose a file --'
          }
          handleOnClick={() => setIsOpen(!isOpen)}
          className="border px-3 py-2 rounded-md w-full !justify-between items-center bg-white flex-row-reverse"
          Icon={BsArrowDown}
          iconColor='text-black'
        />

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
                    <Row className="flex text-lg items-center justify-between">
                      <p>Pdf 1 </p>
                      <Link href={fileUrl}>
                        <BsEye size={20} />
                      </Link>
                    </Row>
                  ) : (
                    <Row className="flex items-center">
                      <div className="w-12 h-12 mr-3 relative">
                        <Image
                          src={fileUrl}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      <span>Image {index + 1}</span>
                    </Row>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {previewUrl && (
        <div className="mt-4">
          <SectionHeading className="font-medium mb-2" title={'Preview'} />

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
              <CardDescription className="mb-2" title={'PDF Preview'} />

              <Link
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                <BsEye size={15} />
                Open PDF Preview
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CustomFileDropdown;
