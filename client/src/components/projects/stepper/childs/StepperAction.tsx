"use client";
import { cancelRoutes, ConfirmStatus, onHoldRoutes } from "@/helpers/helper";
import { changeStepper, changeStepperBack } from "@/lib/project";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmStep from "./ConfirmStep";
interface StepperType {
  step: any;
  index: number;
  projectId: number;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setDone: React.Dispatch<React.SetStateAction<number[]>>;
  done: number[];
}

const StepperAction = ({
  step,
  index,
  projectId,
  activeStep,
  setActiveStep,
  setDone,
  done,
}: StepperType) => {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState("");
  const closeConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOnHold = () => {
    setOpenConfirm(true);
    setConfirmType(ConfirmStatus.ONHOLD);
  };
  const handleCancel = () => {
    setOpenConfirm(true);
    setConfirmType(ConfirmStatus.CANCEL);
  };
  const handleFinish = async () => {
    setOpenConfirm(true);
    setConfirmType(ConfirmStatus.FINISH);
  };

  const handleNext = async () => {
    setDone((prv: any) => [...prv, activeStep]);
    try {
      const { data } = await changeStepper(
        projectId,
        activeStep === 4 ? activeStep + 2 : activeStep + 1,
        activeStep
      );
      setActiveStep(data.index);
    } catch (error: any) {
      console.log(
        error.response?.data?.message
          ? error.response?.data?.message
          : "step changes faild"
      );
    }
  };

  const handleBack = async () => {
    try {
      const { data } = await changeStepperBack(projectId, activeStep);
      setActiveStep(data.index);
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
      {openConfirm && (
        <ConfirmStep
          open={openConfirm}
          close={closeConfirm}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setDone={setDone}
          projectId={projectId}
          confirmType={confirmType}
        />
      )}
      <p
        style={{
          fontSize: "0.69rem",
          color:
            step.value !== "cancelled"
              ? step.value === "completed"
                ? "green"
                : ""
              : "red",
        }}
      >
        {step.description}
      </p>
      <Box>
        {index !== 5 &&
          !done.includes(index) &&
          ([7, 8].includes(index) ? (
            <Button
              onClick={handleFinish}
              size="small"
              variant="contained"
              color="secondary"
              sx={{ mr: 1 }}
            >
              Finish
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              size="small"
              variant="contained"
              sx={{ mr: 1 }}
            >
              Next
            </Button>
          ))}
        {!done.includes(index) && (
          <Button
            disabled={index === 0}
            onClick={handleBack}
            size="small"
            variant="contained"
            sx={{ mr: 1 }}
          >
            {index === 5 ? "active again" : "back"}
          </Button>
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
