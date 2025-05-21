"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal = ({
  isOpen,
  onClose,
}: DeleteAccountModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { deleteAccount } = useAuth();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      await deleteAccount();
    } catch (err) {
      let errorMessage = "Failed to delete account. Please try again.";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      setError(errorMessage);
      console.error("Delete account error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Account</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete your account? This action cannot be
          undone. All your data, including payment history and progress, will be
          permanently deleted.
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};
