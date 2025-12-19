"use client";

import { stepperSteps } from "@/helpers/helper";

const Status = ({ status }: { status: string }) => {
  const currentStep = stepperSteps.find((s) => s.value === status);
  return (
    <p>
      <span style={{ color: currentStep?.textColor, fontWeight: "bold" }}>
        {currentStep?.label.toUpperCase()}
      </span>{" "}
    </p>
  );
};

export default Status;
