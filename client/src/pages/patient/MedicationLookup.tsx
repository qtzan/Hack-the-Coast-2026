import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { apiFetch } from "@/lib/api";
import { Header } from "@/components/shared/Header";
import pillImg from "@/assets/pill.png";

interface Medication {
  generic_name: string;
  brand_names: string[];
  uses: string[];
  side_effects: string[];
  additional_information: {
    food_consumption?: string;
    avoid?: string[];
    alcohol?: string;
    notes?: string;
  };
}

export default function MedicationLookup() {
  const [query, setQuery] = useState("");
  const [allMeds, setAllMeds] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const navigate = useNavigate();

  // Load all medications on mount
  useEffect(() => {
    apiFetch<Medication[]>("/medications")
      .then(setAllMeds)
      .catch(() => setAllMeds([]))
      .finally(() => setLoading(false));
  }, []);

  // Filter client-side
  const results = query.trim().length > 0
    ? allMeds.filter(
        (med) =>
          med.generic_name.toLowerCase().includes(query.toLowerCase()) ||
          med.brand_names.some((b) => b.toLowerCase().includes(query.toLowerCase())) ||
          med.uses.some((u) => u.toLowerCase().includes(query.toLowerCase()))
      )
    : allMeds;

  return (
    <div className="flex flex-col min-h-dvh">
      <Header title="Medication Lookup" onBack={() => navigate("/patient")} />

      <div className="flex-1 overflow-y-auto pb-[100px]">
        {/* Search */}
        <div className="px-6 mt-5 mb-6 sticky top-0 z-10">
          <div className="bg-white rounded-[28px] h-[56px] flex items-center px-4 shadow-sm">
            <img src={pillImg} alt="" className="w-6 h-6 object-contain mr-3" />
            <input
              type="text"
              placeholder="Search medications..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-[16px] text-[#49454f] outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="ml-2 text-gray-400 hover:text-gray-600">
                Clear
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <p className="text-[14px] text-[rgba(0,0,0,0.5)] animate-pulse">Loading medications...</p>
          </div>
        ) : (
          <>
            <div className="px-6 mb-2">
              <p className="text-[13px] text-[rgba(0,0,0,0.4)]">
                {results.length} medication{results.length !== 1 ? "s" : ""} {query ? "found" : "available"}
              </p>
            </div>
            <div className="px-6 space-y-3">
              <AnimatePresence>
                {results.map((med, idx) => (
                  <motion.div
                    key={med.generic_name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                      className="w-full text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img src={pillImg} alt="" className="w-8 h-8 object-contain shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-[16px] text-[#1e1e1e] capitalize">{med.generic_name}</p>
                          <p className="text-[12px] text-[rgba(0,0,0,0.5)]">
                            {med.brand_names.join(", ")}
                          </p>
                        </div>
                        <svg
                          className={`w-5 h-5 text-[#f29d38] transition-transform duration-300 ${expandedIdx === idx ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {expandedIdx === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 space-y-3"
                      >
                        <div>
                          <p className="font-semibold text-[13px] text-[#f29d38] uppercase mb-1">Uses</p>
                          <ul className="list-disc list-inside text-[14px] text-[#1e1e1e] space-y-0.5">
                            {med.uses.map((u) => <li key={u}>{u}</li>)}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-[13px] text-[#f29d38] uppercase mb-1">Side Effects</p>
                          <ul className="list-disc list-inside text-[14px] text-[#1e1e1e] space-y-0.5">
                            {med.side_effects.map((s) => <li key={s}>{s}</li>)}
                          </ul>
                        </div>
                        {med.additional_information && (
                          <div className="bg-[#fff5e6] border-l-4 border-[#f29d38] rounded-r-lg p-3 space-y-1">
                            {med.additional_information.food_consumption && (
                              <p className="text-[13px] text-[#1e1e1e]">
                                <strong>Food:</strong> {med.additional_information.food_consumption}
                              </p>
                            )}
                            {med.additional_information.alcohol && (
                              <p className="text-[13px] text-[#1e1e1e]">
                                <strong>Alcohol:</strong> {med.additional_information.alcohol}
                              </p>
                            )}
                            {med.additional_information.avoid && med.additional_information.avoid.length > 0 && (
                              <p className="text-[13px] text-[#1e1e1e]">
                                <strong>Avoid:</strong> {med.additional_information.avoid.join(", ")}
                              </p>
                            )}
                            {med.additional_information.notes && (
                              <p className="text-[13px] text-[#1e1e1e]">
                                <strong>Note:</strong> {med.additional_information.notes}
                              </p>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {query.length > 0 && results.length === 0 && (
                <p className="text-center text-[14px] text-[rgba(0,0,0,0.5)] py-8">
                  No medications found for "{query}"
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
