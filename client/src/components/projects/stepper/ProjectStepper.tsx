"use client";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { stepperSteps } from "@/helpers/helper";
import { ProjectType } from "@/helpers/types/projects";
import { useState } from "react";
import { changeProjectStatus } from "@/lib/project";
import { useRouter } from "next/navigation";

const ProjectStepper = ({ project }: { project: ProjectType }) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleSubmit(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    handleSubmit(activeStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const handleSubmit = async (step: number) => {
    try {
      await changeProjectStatus(project.id, stepperSteps[step].value);
      router.push("/projects");
      close();
    } catch (error: any) {
      console.log(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Add member faild"
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {stepperSteps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              sx={{ padding: "0 !important", margin: "0 !important" }}
              optional={
                index === stepperSteps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <p style={{ fontSize: "0.69rem" }}>{step.description}</p>
              <Box>
                <Button variant="contained" onClick={handleNext}>
                  {index === stepperSteps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button disabled={index === 0} onClick={handleBack}>
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProjectStepper;
