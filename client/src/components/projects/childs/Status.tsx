"use client";

import { stepperSteps } from "@/helpers/helper";
import { useProjectContext } from "@/hooks/ProjectContext";

const Status = ({ steppers }: any) => {

   try {
    const ctx = useProjectContext();
    steppers = ctx.steppers;
  } catch {
    // context not available → fallback to props
  }

  if (!steppers) return null;
  
  const index = steppers.find((s: any) => s.status === "active")?.index ?? 0;
  const currentStep = stepperSteps.find((s) => s.index === index);

  return (
    <p>
      <span style={{ color: currentStep?.textColor, fontWeight: "bold" }}>
        {currentStep?.label.toUpperCase()}
      </span>{" "}
    </p>
  );
};

export default Status;
