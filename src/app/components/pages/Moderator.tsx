import { useState } from "react";
import { Check, X, Eye, Download, ExternalLink, Clock, AlertCircle } from "lucide-react";

interface Submission {
  id: string;
  courseName: string;
  category: string;
  title: string;
  description: string;
  submittedBy: string;
  submittedAt: string;
  fileCount: number;
  status: "pending" | "approved" | "rejected";
  hasExternalLink?: boolean;
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    courseName: "ICS 202 - Data Structures",
    category: "Past Exams",
    title: "Midterm 1 Practice Problems",
    description: "Collection of practice problems covering linked lists, stacks, and queues with detailed solutions.",
    submittedBy: "Ahmed Hassan",
    submittedAt: "2024-02-28 10:30 AM",
    fileCount: 2,
    status: "pending",
  },
  {
    id: "2",
    courseName: "SWE 206 - Intro to Software Engineering",
    category: "Lecture Notes",
    title: "UML Diagram Examples",
    description: "Comprehensive UML diagrams for various design patterns including Factory, Observer, and Strategy.",
    submittedBy: "Sara Al-Qahtani",
    submittedAt: "2024-02-28 09:15 AM",
    fileCount: 1,
    status: "pending",
    hasExternalLink: true,
  },
  {
    id: "3",
    courseName: "ICS 321 - Algorithm Design & Analysis",
    category: "Study Guides",
    title: "Dynamic Programming Guide",
    description: "Step-by-step explanations of dynamic programming concepts with examples from assignments.",
    submittedBy: "Mohammed Al-Shahrani",
    submittedAt: "2024-02-27 03:45 PM",
    fileCount: 3,
    status: "pending",
  },
  {
    id: "4",
    courseName: "SWE 363 - Web Engineering",
    category: "Project Templates",
    title: "React + TypeScript Starter",
    description: "Complete project template with routing, state management, and authentication setup.",
    submittedBy: "Layla Al-Dosari",
    submittedAt: "2024-02-27 01:20 PM",
    fileCount: 1,
    status: "pending",
    hasExternalLink: true,
  },
];

export function Moderator() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleApprove = (id: string) => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, status: "approved" as const } : sub
    ));
    setSelectedSubmission(null);
  };

  const handleReject = (id: string) => {
    if (rejectionReason.trim()) {
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, status: "rejected" as const } : sub
      ));
      setShowRejectModal(false);
      setRejectionReason("");
      setSelectedSubmission(null);
    }
  };

  const filteredSubmissions = submissions.filter(sub => 
    filter === "all" || sub.status === filter
  );

  const pendingCount = submissions.filter(s => s.status === "pending").length;
  const approvedCount = submissions.filter(s => s.status === "approved").length;
  const rejectedCount = submissions.filter(s => s.status === "rejected").length;

  return (
    <div className="p-8">
      {/* Description */}
      <div className="mb-8 bg-[#10B981]/10 dark:bg-[#10B981]/20 rounded-[16px] p-6 border border-[#10B981]/20">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Moderation Flow</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Moderators review student-submitted resources before they appear in the Resource Library. Each submission should be 
          checked for relevance, quality, and compliance with academic integrity policies. Approved resources become immediately 
          visible to all students. Rejected submissions can include feedback explaining the reason for rejection.
        </p>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Moderator Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Review and approve student resource submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 dark:from-[#F59E0B]/20 dark:to-[#F59E0B]/10 rounded-[16px] p-6 border border-[#F59E0B]/20">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-[#F59E0B]" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Pending Review</h3>
          </div>
          <div className="text-3xl font-bold text-[#F59E0B]">{pendingCount}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Awaiting moderation</p>
        </div>

        <div className="bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 dark:from-[#10B981]/20 dark:to-[#10B981]/10 rounded-[16px] p-6 border border-[#10B981]/20">
          <div className="flex items-center gap-3 mb-2">
            <Check className="w-6 h-6 text-[#10B981]" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Approved</h3>
          </div>
          <div className="text-3xl font-bold text-[#10B981]">{approvedCount}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Published to library</p>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 dark:from-red-500/20 dark:to-red-500/10 rounded-[16px] p-6 border border-red-500/20">
          <div className="flex items-center gap-3 mb-2">
            <X className="w-6 h-6 text-red-500" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Rejected</h3>
          </div>
          <div className="text-3xl font-bold text-red-500">{rejectedCount}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Did not meet criteria</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            filter === "all"
              ? "bg-[#1E3A8A] dark:bg-[#06B6D4] text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          All ({submissions.length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            filter === "pending"
              ? "bg-[#1E3A8A] dark:bg-[#06B6D4] text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            filter === "approved"
              ? "bg-[#1E3A8A] dark:bg-[#06B6D4] text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          Approved ({approvedCount})
        </button>
        <button
          onClick={() => setFilter("rejected")}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            filter === "rejected"
              ? "bg-[#1E3A8A] dark:bg-[#06B6D4] text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          Rejected ({rejectedCount})
        </button>
      </div>

      {/* Submissions Table */}
      <div className="bg-white dark:bg-gray-900 rounded-[16px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Course & Title</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Submitted By</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{submission.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{submission.courseName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-[#06B6D4]/10 dark:bg-[#06B6D4]/20 text-[#06B6D4] rounded-lg text-sm font-medium">
                      {submission.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{submission.submittedBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{submission.submittedAt}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                        submission.status === "pending"
                          ? "bg-[#F59E0B]/10 dark:bg-[#F59E0B]/20 text-[#F59E0B]"
                          : submission.status === "approved"
                          ? "bg-[#10B981]/10 dark:bg-[#10B981]/20 text-[#10B981]"
                          : "bg-red-500/10 dark:bg-red-500/20 text-red-500"
                      }`}
                    >
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="p-2 hover:bg-[#06B6D4]/10 dark:hover:bg-[#06B6D4]/20 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5 text-[#06B6D4]" />
                      </button>
                      {submission.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(submission.id)}
                            className="p-2 hover:bg-[#10B981]/10 dark:hover:bg-[#10B981]/20 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check className="w-5 h-5 text-[#10B981]" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setShowRejectModal(true);
                            }}
                            className="p-2 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <X className="w-5 h-5 text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSubmission && !showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-8 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-[16px] p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {selectedSubmission.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{selectedSubmission.courseName}</p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</h3>
                <span className="inline-block px-3 py-1 bg-[#06B6D4]/10 dark:bg-[#06B6D4]/20 text-[#06B6D4] rounded-lg text-sm font-medium">
                  {selectedSubmission.category}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedSubmission.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Submitted By</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedSubmission.submittedBy}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Submission Date</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedSubmission.submittedAt}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Files</h3>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Download className="w-5 h-5" />
                  <span>{selectedSubmission.fileCount} file(s) attached</span>
                </div>
                {selectedSubmission.hasExternalLink && (
                  <div className="flex items-center gap-2 text-[#06B6D4] mt-2">
                    <ExternalLink className="w-5 h-5" />
                    <span>External link included</span>
                  </div>
                )}
              </div>
            </div>

            {selectedSubmission.status === "pending" && (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowRejectModal(true);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(selectedSubmission.id)}
                  className="flex-1 bg-gradient-to-r from-[#10B981] to-[#06B6D4] hover:from-[#10B981]/90 hover:to-[#06B6D4]/90 text-white py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-8 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-[16px] p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Reject Submission</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Provide a reason for rejection</p>
              </div>
            </div>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Explain why this submission is being rejected..."
              rows={4}
              className="w-full px-4 py-3 bg-[#F8FAFC] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent resize-none mb-6"
            />

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedSubmission.id)}
                disabled={!rejectionReason.trim()}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-medium transition-all"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
