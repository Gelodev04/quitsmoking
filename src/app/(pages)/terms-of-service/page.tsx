export default function TermsOfServicePage() {
  return (
    <main>
      <section className="background px-3 py-10 md:py-[4rem]">
        <div className="rounded-[20px] p-[20px] bg-white text-black text-[12px] md:text-[18px] flex flex-col items-center max-w-[707px] mx-auto">
          <h1 className="text-[20px] md:text-[30px] font-bold text-[#2D2D2D] mb-[30px]">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-8">Last updated: May 20, 2025</p>

          <div className="w-full space-y-8">
            <p>
              Welcome to Burn My Pack, a platform designed to help users quit
              smoking through self-discipline, structured tracking, and
              behavioral psychology. By using this website or app, you agree to
              the terms outlined below.
            </p>

            <div>
              <h2 className="text-[16px] md:text-[24px] font-bold text-[#2D2D2D] mb-4">
                1. Purpose of the Service
              </h2>
              <p>
                Burn My Pack is not just a quitting tool — it's a commitment
                contract. Users voluntarily commit to their goal of quitting
                smoking by making non-refundable financial penalties when they
                slip. This system leverages behavioral psychology principles
                such as loss aversion to strengthen your resolve.
              </p>
            </div>

            <div>
              <h2 className="text-[16px] md:text-[24px] font-bold text-[#2D2D2D] mb-4">
                2. Eligibility
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 13 years old to use the service.</li>
                <li>
                  By using Burn My Pack, you confirm that you understand and
                  accept the behavioral approach behind it.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[16px] md:text-[24px] font-bold text-[#2D2D2D] mb-4">
                3. Account and Login
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You may sign up or log in via third-party platforms (e.g.,
                  Google, Facebook).
                </li>
                <li>
                  You are responsible for all activity under your account.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[16px] md:text-[24px] font-bold text-[#2D2D2D] mb-4">
                4. Self-Imposed Financial Penalties
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Certain actions on this platform (e.g., declaring a smoking
                  relapse or starting your journey) may involve voluntary
                  payments made as self-imposed penalties.
                </li>
                <li>These payments are 100% non-refundable.</li>
                <li>
                  The irrevocability of these payments is core to the behavioral
                  mechanism that makes Burn My Pack effective.
                </li>
                <li>
                  If these penalties were refundable, the system would lose its
                  intended psychological impact — and the service would fail to
                  serve its purpose.
                </li>
                <li>
                  By making a payment, you agree in advance to this no-refund
                  policy.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[16px] md:text-[24px] font-bold text-[#2D2D2D] mb-4">
                5. Payments
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All payments are securely processed via PayPal.</li>
                <li>
                  We do not store your card information or login credentials.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[16px] md:text-[24px] font-bold text-[#2D2D2D] mb-4">
                6. Data Collection
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  We collect limited user data (e.g., email, username, quit
                  progress).
                </li>
                <li>Please review our Privacy Policy for full details.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[16px] md:text-[24px] font-bold text-[#2D2D2D] mb-4">
                7. No Medical Advice
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Burn My Pack does not provide medical advice or treatment.
                </li>
                <li>
                  Always consult a licensed healthcare provider for medical
                  decisions.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[16px] md:text-[24px] font-bold text-[#2D2D2D] mb-4">
                8. Termination
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may delete your account at any time.</li>
                <li>
                  We reserve the right to suspend or terminate accounts that
                  abuse the service or violate these terms.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[16px] md:text-[24px] font-bold text-[#2D2D2D] mb-4">
                9. Changes to Terms
              </h2>
              <p>
                We may update these Terms of Service periodically. Continued use
                of the service constitutes acceptance of any changes.
              </p>
            </div>

            <div>
              <h2 className="text-[16px] md:text-[24px] font-bold text-[#2D2D2D] mb-4">
                10. Contact
              </h2>
              <p>
                If you have questions, email us at:{" "}
                <a
                  href="mailto:storytellor@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  storytellor@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
