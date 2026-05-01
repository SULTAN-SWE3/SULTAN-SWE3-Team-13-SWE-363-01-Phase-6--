import { CheckCircle, X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPlan: () => void;
  courseName?: string;
}

export function SuccessModal({ isOpen, onClose, onViewPlan, courseName }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#10B981] to-[#06B6D4] p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-12 h-12" />
            <div>
              <h2 className="text-2xl font-semibold">Course Added</h2>
              {courseName && (
                <p className="text-sm text-white/90 mt-1">{courseName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 text-base">
            The course has been successfully added to your Major Plan.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onViewPlan}
            className="flex-1 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white py-3 px-6 rounded-xl font-medium transition-colors"
          >
            View Plan
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
