import { CRIDrug } from "@/components/CRIs/CRIDrugs";

export function calculateCRI(dose: number, weight: number, drug: CRIDrug) {
  let rateInMcgOrMgPerHr: number;

  if (drug.units.includes("min")) {
    rateInMcgOrMgPerHr = dose * weight * 60;
  } else {
    rateInMcgOrMgPerHr = dose * weight;
  }

  const mLhr = rateInMcgOrMgPerHr / drug.concentration;

  return {
    dose,
    rate: rateInMcgOrMgPerHr.toFixed(1),
    mLhr: mLhr.toFixed(2),
  };
}
