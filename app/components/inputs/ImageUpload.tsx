"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="gy6qzghq"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => (
          <div
            onClick={() => open?.()}
            className="
                relative
                rounded-md
                border-dashed
                border-2
                p-20
                border-neutral-300
                cursor-pointer
                hover:opacity-70
                transition
                flex
                flex-col
                justify-center
                items-center
                gap-4
                text-neutral-600
                "
          >
            <TbPhotoPlus size={50} />
            <span className="font-semibold text-lg">
              Click here to upload your place picture
            </span>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Your place picture"
                  src={value}
                  fill
                  style={{ objectFit: "cover", borderRadius: "0.375rem" }}
                />
              </div>
            )}
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
