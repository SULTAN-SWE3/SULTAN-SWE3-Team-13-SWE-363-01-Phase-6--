import { useState } from "react";
import { Upload as UploadIcon, File, X, Check, AlertCircle, FileText, Link as LinkIcon } from "lucide-react";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export function Upload() {
  const [formData, setFormData] = useState({
    courseName: "",
    category: "",
    title: "",
    description: "",
    resourceUrl: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Lecture Notes",
    "Past Exams",
    "Lab Materials",
    "Project Templates",
    "Study Guides",
    "Reference Materials",
    "Video Tutorials",
    "Other"
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.courseName.trim()) {
      newErrors.courseName = "Course name is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Resource title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (uploadedFiles.length === 0 && !formData.resourceUrl) {
      newErrors.files = "Please upload files or provide a resource URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
      // Reset form
      setTimeout(() => {
        setFormData({
          courseName: "",
          category: "",
          title: "",
          description: "",
          resourceUrl: "",
        });
        setUploadedFiles([]);
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Description */}
      <div className="mb-8 bg-[#06B6D4]/10 dark:bg-[#06B6D4]/20 rounded-[16px] p-6 border border-[#06B6D4]/20">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Upload Resource Logic</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Students can upload study materials to share with peers. All submissions are reviewed by moderators before appearing 
          in the Resource Library. Accepted file types include PDF, DOCX, PPTX, and links to external resources. 
          Files must be relevant to KFUPM Software Engineering courses and follow academic integrity guidelines.
        </p>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Upload Resource</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your study materials with fellow students
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-[#10B981]/10 border border-[#10B981]/30 rounded-[16px] p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center">
            <Check className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#10B981]">Submission Successful!</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Your resource has been submitted for review. You'll be notified once it's approved.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-[16px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          {/* Course Name */}
          <div className="mb-6">
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              id="courseName"
              type="text"
              value={formData.courseName}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
              placeholder="e.g., ICS 202 - Data Structures"
              className={`w-full px-4 py-3 bg-[#F8FAFC] dark:bg-gray-800 border ${
                errors.courseName ? "border-red-500" : "border-gray-200 dark:border-gray-700"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all`}
            />
            {errors.courseName && (
              <div className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                {errors.courseName}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-4 py-3 bg-[#F8FAFC] dark:bg-gray-800 border ${
                errors.category ? "border-red-500" : "border-gray-200 dark:border-gray-700"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                {errors.category}
              </div>
            )}
          </div>

          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Resource Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Midterm 1 Study Guide"
              className={`w-full px-4 py-3 bg-[#F8FAFC] dark:bg-gray-800 border ${
                errors.title ? "border-red-500" : "border-gray-200 dark:border-gray-700"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all`}
            />
            {errors.title && (
              <div className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a detailed description of the resource..."
              rows={4}
              className={`w-full px-4 py-3 bg-[#F8FAFC] dark:bg-gray-800 border ${
                errors.description ? "border-red-500" : "border-gray-200 dark:border-gray-700"
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all resize-none`}
            />
            {errors.description && (
              <div className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                {errors.description}
              </div>
            )}
          </div>

          {/* File Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Files
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-[16px] p-8 text-center transition-all
                ${isDragging 
                  ? "border-[#06B6D4] bg-[#06B6D4]/5" 
                  : "border-gray-300 dark:border-gray-600 bg-[#F8FAFC] dark:bg-gray-800"
                }
                ${errors.files ? "border-red-500" : ""}
              `}
            >
              <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Supported formats: PDF, DOCX, PPTX (Max 10MB per file)
              </p>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="inline-block bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white px-6 py-2 rounded-xl cursor-pointer transition-all"
              >
                Choose Files
              </label>
            </div>
            {errors.files && (
              <div className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                {errors.files}
              </div>
            )}
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Uploaded Files ({uploadedFiles.length})
              </h3>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#F8FAFC] dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#06B6D4]" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Resource URL */}
          <div className="mb-6">
            <label htmlFor="resourceUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              External Resource URL (Optional)
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="resourceUrl"
                type="url"
                value={formData.resourceUrl}
                onChange={(e) => setFormData({ ...formData, resourceUrl: e.target.value })}
                placeholder="https://example.com/resource"
                className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Link to YouTube, GitHub, Google Drive, or other platforms
            </p>
          </div>

          {/* Guidelines */}
          <div className="bg-[#F59E0B]/10 dark:bg-[#F59E0B]/20 rounded-[12px] p-4 border border-[#F59E0B]/20">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">Submission Guidelines</h4>
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Content must be relevant to KFUPM SWE curriculum</li>
              <li>• Ensure you have rights to share the material</li>
              <li>• No copyrighted or protected content without permission</li>
              <li>• Resources will be reviewed within 24-48 hours</li>
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                courseName: "",
                category: "",
                title: "",
                description: "",
                resourceUrl: "",
              });
              setUploadedFiles([]);
              setErrors({});
            }}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Reset Form
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-[#1E3A8A] to-[#06B6D4] hover:from-[#1E3A8A]/90 hover:to-[#06B6D4]/90 text-white py-3 px-6 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <UploadIcon className="w-5 h-5" />
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
}
