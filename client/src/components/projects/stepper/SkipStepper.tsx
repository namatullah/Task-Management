"use client";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import {
  cancelRoutes,
  onHoldRoutes,
  Status,
  stepperSteps,
} from "@/helpers/helper";
import { ProjectType } from "@/helpers/types/projects";
import { useLayoutEffect, useState } from "react";
import { changeStepper, changeStepperBack, fetchStepper } from "@/lib/project";
import { useRouter } from "next/navigation";
import { StepIconProps, styled } from "@mui/material";
import { Check } from "@mui/icons-material";

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme }) => ({
    color: "#7C8085FF",
    display: "flex",
    height: 22,
    alignItems: "center",
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 16,
      marginLeft: "5px",
      marginRight: "6px",
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
      marginLeft: "8px",
      marginRight: "11px",
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[700],
    }),
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          color: "#784af4",
        },
      },
    ],
  })
);
function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const SkipStepper = ({ project }: { project: ProjectType }) => {
  const router = useRouter();
  const [done, setDone] = useState<any>([]);
  const [activeStep, setActiveStep] = useState(0);

  const getStepperData = async () => {
    try {
      const { data } = await fetchStepper(project.id);
      const doneStep = data
        .filter((s: any) => s.status === Status.DONE)
        .map((s: any) => s.index);
      setDone(doneStep);
      const acitveData = data.find((s: any) => s.status === Status.ACTIVE);
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

  const handleNext = () => {
    setDone((prv: any) => [...prv, activeStep]);
    if (activeStep === 4) {
      handleSubmit(activeStep + 2, activeStep);
    } else {
      handleSubmit(activeStep + 1, activeStep);
    }
  };
  const handleOnHold = () => {
    setDone((prv: any) => [...prv, activeStep]);
    handleSubmit(5, activeStep);
  };
  const handleCancel = () => {
    setDone((prv: any) => [...prv, activeStep]);
    handleSubmit(8, activeStep);
  };

  const handleBack = async () => {
    console.log(activeStep);
    try {
      const { data } = await changeStepperBack(project.id, activeStep);
      setActiveStep(data.index);
      router.push("/projects");
    } catch (error: any) {
      console.log(
        error.response?.data?.message
          ? error.response?.data?.message
          : "step changes faild"
      );
    }
  };

  const handleSubmit = async (activeIndex: number, doneIndex: number) => {
    try {
      const { data } = await changeStepper(project.id, activeIndex, doneIndex);
      setActiveStep(data.index);
      router.push("/projects");
    } catch (error: any) {
      console.log(
        error.response?.data?.message
          ? error.response?.data?.message
          : "step changes faild"
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {stepperSteps.map((step, index) => (
          <Step key={step.label} completed={done.includes(index)}>
            <StepLabel
              sx={{ padding: "0 !important", margin: "0 !important" }}
              StepIconComponent={QontoStepIcon}
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <p
                style={{
                  fontSize: "0.69rem",
                  color:
                    step.value !== "cancelled"
                      ? step.value === "completed"
                        ? "green"
                        : "#3c3939"
                      : "red",
                }}
              >
                {step.description}
              </p>
              <Box>
                {index !== stepperSteps.length - 1 &&
                  index !== stepperSteps.length - 2 && (
                    <>
                      {index !== 5 && (
                        <Button
                          onClick={handleNext}
                          size="small"
                          variant="contained"
                          sx={{ mr: 1 }}
                        >
                          Next
                        </Button>
                      )}

                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        size="small"
                        variant="contained"
                        sx={{ mr: 1 }}
                      >
                        {index === 5 ? "active again" : "back"}
                      </Button>
                    </>
                  )}

                {onHoldRoutes.includes(step.value) && (
                  <Button
                    onClick={handleOnHold}
                    size="small"
                    sx={{ color: "#FFC107", mr: 1 }}
                    variant="outlined"
                  >
                    On Hold
                  </Button>
                )}
                {cancelRoutes.includes(step.value) && (
                  <Button
                    onClick={handleCancel}
                    size="small"
                    sx={{ color: "#DC3545", mr: 1 }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default SkipStepper;
