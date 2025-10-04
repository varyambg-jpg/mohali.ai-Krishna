import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer | Mohali.ai",
  description: "Disclaimer for Mohali.ai job portal",
}

export default function DisclaimerPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>

      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          <strong>Mohali.ai</strong> is an online platform that connects job seekers with
          employers. We only provide a space for posting and searching job opportunities
          and do <strong>not</strong> participate in the recruitment process, interviews,
          or selection of candidates.
        </p>

        <p>
          All job listings, details, and employer information are provided by third
          parties. <strong>Mohali.ai</strong> does not verify the accuracy, authenticity,
          or reliability of such postings, employers, or candidates.
        </p>

        <p>
          We make no guarantees regarding employment, job offers, interviews, or hiring
          outcomes. Any agreements, promises, or commitments made between job seekers and
          employers are strictly between those parties, without any involvement from{" "}
          <strong>Mohali.ai</strong>.
        </p>

        <p>
          Any personal details, resumes, or communication shared during the application
          process are directly exchanged between job seekers and employers.{" "}
          <strong>Mohali.ai</strong> has no responsibility or control over such exchanges.
        </p>

        <p>
          We are not responsible for any <strong>fraud, misrepresentation, monetary loss,
          disputes, or damages</strong> arising from the use of this platform. Users are
          strongly advised to independently verify the legitimacy of job opportunities
          before taking any action.
        </p>

        <p>
          By accessing and using this site, you agree to use it responsibly and at your
          own risk.
        </p>

        <p>
          For support or queries, contact us at:{" "}
          <a
            href="mailto:smart.jobportal129@gmail.com"
            className="text-blue-600 hover:underline"
          >
            smart.jobportal129@gmail.com
          </a>
        </p>
      </div>
    </section>
  )
}
