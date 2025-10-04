import Image from "next/image"

export default function Blog6() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Blog Header */}
      <h1 className="text-3xl font-bold mb-6">
        Meerut Resident Acquitted in Arms Act Case After Being on Bail for 5 Years
      </h1>

      {/* Blog Image */}
      <Image
        src="/blog/blog6.jpg"
        alt="Meerut Resident Acquitted"
        width={800}
        height={400}
        className="rounded-lg mb-6"
      />

      {/* Blog Content */}
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          In a case that highlights the long and often exhausting journey of the justice system, a{" "}
          <strong>Meerut resident</strong> has been acquitted in an <strong>Arms Act case</strong> after spending
          nearly <strong>five years on bail</strong>. The verdict, delivered by a local court, has brought relief
          to the accused and his family, who had been living under the shadow of legal uncertainty since his
          arrest.
        </p>

        <h2 className="text-2xl font-semibold">The Case Background</h2>
        <p>
          The case dates back to 2019, when police arrested the Meerut resident on allegations of possessing an
          illegal firearm. An FIR was lodged under provisions of the <strong>Arms Act, 1959</strong>, which
          regulates the acquisition and possession of firearms in India.
        </p>
        <p>
          The prosecution claimed that during a routine patrol, police officials found the accused in possession
          of a country-made pistol and live cartridges without a valid license. The accused was booked immediately
          and later granted bail, but the legal proceedings stretched over five years.
        </p>

        <h2 className="text-2xl font-semibold">The Trial and Evidence</h2>
        <p>
          During the trial, the defense argued that the accused was <strong>falsely implicated</strong> and that
          the recovery of the alleged weapon was fabricated. His counsel highlighted inconsistencies in the
          police account, including discrepancies in the seizure memo and the absence of independent witnesses at
          the time of recovery.
        </p>
        <p>
          The court took note of these contradictions and also questioned the lack of forensic evidence to
          conclusively prove the weapon was functional. Furthermore, the prosecution failed to establish beyond
          reasonable doubt that the accused had actual possession of the firearm.
        </p>
        <p>
          After reviewing all the evidence and hearing both sides, the court ruled that the prosecution had not
          been able to prove its case and acquitted the accused of all charges.
        </p>

        <h2 className="text-2xl font-semibold">Five Years of Uncertainty</h2>
        <p>
          For the accused, the verdict marks the end of a long period of uncertainty. Though he was out on bail,
          the stigma of being booked under the Arms Act weighed heavily on him and his family. Opportunities for
          employment and social acceptance were affected, as many in society tend to assume guilt until innocence
          is proven.
        </p>
        <p>
          Speaking after the acquittal, his relatives expressed relief but also frustration over the time taken
          for justice. “Five years of his life were wasted because of a weak case. The court has cleared his name,
          but who will give him back the lost time?” a family member said.
        </p>

        <h2 className="text-2xl font-semibold">Broader Implications</h2>
        <p>
          Legal experts note that such cases are not uncommon. Many accused individuals spend years fighting
          cases, even when evidence is weak. The delay in trials often results in unnecessary hardship for those
          later found innocent.
        </p>
        <p>
          The verdict once again emphasizes the principle that <strong>“bail is not acquittal.”</strong> Even when
          released on bail, the accused must endure years of restrictions and social stigma until the case is
          resolved.
        </p>

        <h2 className="text-2xl font-semibold">Conclusion</h2>
        <p>
          The acquittal of the Meerut resident in the Arms Act case after five years brings closure to a long and
          difficult ordeal. While justice has ultimately prevailed, the case underscores the urgent need for
          speedier trials, stronger evidence collection, and reforms to ensure that innocent individuals do not
          spend years entangled in the legal system.
        </p>
        <p>
          For the acquitted man, the judgment is a new beginning, free from the burden of an allegation that
          shadowed his life for half a decade.
        </p>
      </div>
    </div>
  )
}
