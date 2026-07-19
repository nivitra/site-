import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

type Cell = string | boolean;

const rows: [string, Cell, Cell, Cell][] = [
  ["Price per minute of conversation", "from ₹4.75", "₹9–14 (billed in USD)", "₹22–35 per agent"],
  ["Charged only for real conversations", true, false, false],
  ["Speaks all Indian languages naturally", true, "partial", false],
  ["Replies in less than a second", true, "varies", "—"],
  ["Easy conversation builder (no coding)", true, "some", false],
  ["Instant handoff to your human team", true, false, true],
  ["Works with your existing phone setup", true, "limited", "—"],
  ["Use your preferred AI provider", true, false, "—"],
  ["Calling rules followed automatically", true, false, "manual"],
  ["Data stored safely in India", true, false, true],
  ["Handles thousands of calls at once", true, true, false],
  ["Setup fees", "None", "Often", "High"],
];

function CellView({ v, highlight = false }: { v: Cell; highlight?: boolean }) {
  if (v === true)
    return (
      <svg className="mx-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={highlight ? "#4ade80" : "#9db4a8"} strokeWidth="3" strokeLinecap="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  if (v === false)
    return (
      <svg className="mx-auto opacity-50" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    );
  return <span className={`text-xs sm:text-sm ${highlight ? "font-semibold text-brand-600" : "text-muted"}`}>{v}</span>;
}

export default function CompareTable() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Compare"
          title="The numbers don't lie. See for yourself."
        />
        <Reveal delay={0.1}>
          <div className="card mt-12 overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th className="px-6 py-5 text-sm font-semibold text-muted">Capability</th>
                    <th className="bg-brand-500/10 px-6 py-5 text-center">
                      <span className="text-sm font-bold text-brand-600">Speaksy</span>
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-semibold text-muted">
                      Global voice AI
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-semibold text-muted">
                      Call center
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, a, b, c], i) => (
                    <tr key={label} className={`border-b border-line/50 ${i % 2 ? "bg-white/[0.015]" : ""}`}>
                      <td className="px-6 py-4 text-sm font-medium">{label}</td>
                      <td className="bg-brand-500/[0.07] px-6 py-4 text-center">
                        <CellView v={a} highlight />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CellView v={b} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CellView v={c} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
