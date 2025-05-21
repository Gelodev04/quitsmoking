"use client";

import "../../globals.css";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DeleteAccountModal } from "@/components/DeleteAccountModal";

export default function HowToDelete() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <main>
      <section className="background  px-3 py-10 md:py-[4rem]">
        <div className="rounded-[20px] p-[20px] bg-white text-black text-[12px] md:text-[18px] flex flex-col items-center max-w-[707px] mx-auto">
          <h1 className="text-[20px] md:text-[30px] font-bold text-[#2D2D2D] mb-[30px]">
            How to Delete Your Data
          </h1>
          <p className="mb-8">
            To delete your account and all associated data from Burn My Pack:
            <br />
            <br />
            1. Log in to your account.
            <br />
            <br />
            2. Click <strong>Delete My Account</strong>
            <br />
            <br />
            3. Confirm your deletion request.
            <br />
            <br />
            We will permanently remove all user data, including progress history
            and login records, within 48 hours.
            <br />
            <br />
            If you experience any issues, please contact:{" "}
            <a
              href="mailto:storytellor@gmail.com"
              className="text-blue-600 hover:underline"
            >
              storytellor@gmail.com
            </a>
          </p>

          {user && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete My Account
            </button>
          )}
        </div>
      </section>

      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
