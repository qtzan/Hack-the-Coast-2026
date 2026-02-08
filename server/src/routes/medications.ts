import { Router, Request, Response } from "express";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

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

let medications: Medication[] = [];

function loadMedications() {
  if (medications.length > 0) return;
  const filePath = path.join(__dirname, "../../../medication.json");
  const data = readFileSync(filePath, "utf-8");
  medications = JSON.parse(data);
}

router.get("/", (req: Request, res: Response) => {
  loadMedications();
  const search = (req.query.search as string || "").toLowerCase().trim();

  if (!search) {
    res.json(medications.slice(0, 20));
    return;
  }

  const results = medications.filter(
    (med) =>
      med.generic_name.toLowerCase().includes(search) ||
      med.brand_names.some((b) => b.toLowerCase().includes(search)) ||
      med.uses.some((u) => u.toLowerCase().includes(search))
  );

  res.json(results.slice(0, 50));
});

export default router;
