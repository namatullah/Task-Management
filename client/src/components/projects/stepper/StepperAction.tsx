import { cancelRoutes, onHoldRoutes, stepperSteps } from "@/helpers/helper";
import { changeStepper, changeStepperBack } from "@/lib/project";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Confirm from "./ConfirmStep";
import { useState } from "react";
interface StepperType {
  step: any;
  index: number;
  projectId: number;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setDone: React.Dispatch<React.SetStateAction<number[]>>;
}

const StepperAction = ({
  step,
  index,
  projectId,
  activeStep,
  setActiveStep,
  setDone,
}: StepperType) => {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const closeConfirm = () => {
    setOpenConfirm(false);
  };
  const handleNext = () => {
    setDone((prv: any) => [...prv, activeStep]);
    if (activeStep === 4) {
      handleSubmit(activeStep + 2, activeStep);
    } else {
      handleSubmit(activeStep + 1, activeStep);
    }
  };
  const handleOnHold = () => {
    setOpenConfirm(true);
    if (confirm) {
      setDone((prv: any) => [...prv, activeStep]);
      handleSubmit(5, activeStep);
    }
  };
  const handleCancel = () => {
    setDone((prv: any) => [...prv, activeStep]);
    handleSubmit(8, activeStep);
  };

  const handleBack = async () => {
    try {
      const { data } = await changeStepperBack(projectId, activeStep);
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
      const { data } = await changeStepper(projectId, activeIndex, doneIndex);
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
    <>
      {openConfirm && <Confirm open={openConfirm} close={closeConfirm} />}
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
    </>
  );
};

export default StepperAction;
