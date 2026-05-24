import type { Metadata } from "next";
import { CuetUgPageContent } from "./CuetUgPageContent";

export const metadata: Metadata = {
    title: "CUET UG 2026 Score Calculator & Percentile Predictor | NTA Score",
    description: "Free NTA CUET UG 2026 score calculator. Calculate CUET UG raw score, predict percentile, and compare CUET 2026 Marks vs Percentile for DU and BHU admissions.",
    keywords: [
        "CUET UG 2026 Score Calculator",
        "CUET Score Predictor 2026",
        "Calculate CUET UG Raw Score",
        "CUET 2026 Marks vs Percentile Calculator",
        "NTA CUET UG Score Calculator",
        "CUET Percentile Predictor 2026",
        "How to calculate CUET UG score 2026",
        "CUET UG 2026 marking scheme",
        "CUET normalization process explained",
        "How to use CUET response sheet to calculate marks",
        "CUET 2026 negative marking formula",
        "Calculating CUET percentile from raw marks",
        "Good score in CUET UG 2026",
        "CUET marks vs percentile for DU",
        "What is a safe score for BHU in CUET 2026?",
        "CUET 2026 expected cut-off for top universities",
        "CUET score required for North Campus DU",
        "CUET 700+ marks vs percentile",
        "CUET UG answer key 2026 download",
        "NTA normalization formula CUET 2026",
        "CUET subject-wise score calculator (Domain + General Test)",
        "CUET 2026 score calculator for Science/Commerce/Arts",
        "Calculate CUET score without official answer key"
    ],
    openGraph: {
        title: "NTA CUET UG 2026 Score Calculator & Predictor",
        description: "Calculate your CUET UG raw score instantly. Predict percentile and check admission chances for top central universities like DU and BHU.",
        type: "website",
    },
};

export default function CuetUgCalculatorPage() {
    return <CuetUgPageContent />;
}
