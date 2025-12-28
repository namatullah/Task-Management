"use client";

import { stepperSteps } from "@/helpers/helper";

const Status = ({ steppers }: any) => {
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
