"use client";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { Status, stepperSteps } from "@/helpers/helper";
import { useLayoutEffect, useState } from "react";
import { fetchStepper } from "@/lib/project";
import { useProjectContext } from "@/hooks/ProjectContext";
import QontoStepIconHelper from "./childs/QontoStepIconHelper";
import StepperAction from "./childs/StepperAction";

const ProjectStepper = ({ id }: number | any) => {
  const [done, setDone] = useState<any>([]);
  const [activeStep, setActiveStep] = useState(0);
  const { setSteppers, setStatus } = useProjectContext();

  const getStepperData = async () => {
    try {
      // fetchs the steps data
      const { data } = await fetchStepper(id);
      setSteppers(data)
      const doneStep = data
        .filter((s: any) => s.status === Status.DONE)
        .map((s: any) => s.index);
      setDone(doneStep);
      const acitveData = data.find((s: any) => s.status === Status.ACTIVE);
      setStatus(acitveData.index)
      if (acitveData) {
        setActiveStep(acitveData.index);
      } else {
        const last = data.reduce((max: any, curr: any) =>
          curr.index > max.index ? curr : max
        );
        setActiveStep(last?.index);
      }
    } catch (error: any) {
      console.log(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Failed to fetch"
      );
    }
  };

  useLayoutEffect(() => {
    getStepperData();
  }, [activeStep]);
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {stepperSteps.map((step, index) => (
          <Step key={step.label} completed={done.includes(index)}>
            <StepLabel
              sx={{ padding: "0 !important", margin: "0 !important" }}
              StepIconComponent={QontoStepIconHelper}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <StepperAction
                step={step}
                index={index}
                projectId={id}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                setDone={setDone}
                done={done}
              />
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProjectStepper;
