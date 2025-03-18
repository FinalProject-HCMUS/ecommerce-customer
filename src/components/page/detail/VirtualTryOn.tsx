import type React from "react"
import { useState } from "react"

const VirtualTryOn: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="mt-16 mb-8">
      <h2 className="text-3xl font-bold text-center mb-8">Virtual Try On</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image Placeholders */}
        <div className="bg-gray-100 rounded-md aspect-[3/4] flex items-center justify-center">
          {/* Placeholder for model image */}
        </div>
        <div className="bg-gray-100 rounded-md aspect-[3/4] flex items-center justify-center">
          {/* Placeholder for t-shirt image */}
        </div>
        <div className="bg-gray-100 rounded-md aspect-[3/4] flex items-center justify-center">
          {uploadedImage ? (
            <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="max-h-full object-contain" />
          ) : (
            <div className="text-gray-400">Result</div>
          )}
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-center mt-6">
        <label className="bg-gray-200 hover:bg-gray-300 transition-colors duration-200 px-4 py-2 rounded-md cursor-pointer">
          Upload your image
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>
    </div>
  )
}

export default VirtualTryOn

