"use client";
import { ConfirmStatus } from "@/helpers/helper";
import { changeStepper, finishStepper } from "@/lib/project";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface ConfirmTypes {
  open: boolean;
  close: () => void;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setDone: React.Dispatch<React.SetStateAction<number[]>>;
  projectId: number;
  confirmType: string;
}

const ConfirmStep = ({
  open,
  close,
  activeStep,
  setActiveStep,
  setDone,
  projectId,
  confirmType,
}: ConfirmTypes) => {
  const router = useRouter();

  const title =
    confirmType === ConfirmStatus.ONHOLD
      ? "Are you sure that you want to ON HOLD this project?"
      : confirmType === ConfirmStatus.CANCEL
      ? "Are you sure you want to CANCEL this project?"
      : confirmType === ConfirmStatus.FINISH
      ? "Are you sure to End the project?"
      : "";

  const message =
    confirmType === ConfirmStatus.ONHOLD
      ? "If you ON HOLD, operations will be limited in this project"
      : confirmType === ConfirmStatus.CANCEL
      ? "Be sure that after cancel, you can not step back the project"
      : confirmType === ConfirmStatus.FINISH
      ? "After you FINISH the project, you can not step back the project"
      : "";

  const handleAction = () => {
    setDone((prv: any) => [...prv, activeStep]);
    if (confirmType === ConfirmStatus.ONHOLD) {
      handleSubmit(5, activeStep);
    } else if (confirmType === ConfirmStatus.CANCEL) {
      handleSubmit(8, activeStep);
    } else if (confirmType === ConfirmStatus.FINISH) {
      handleFinish(activeStep);
    }
  };

  const handleSubmit = async (activeIndex: number, doneIndex: number) => {
    try {
      const { data } = await changeStepper(projectId, activeIndex, doneIndex);
      setActiveStep(data.index);
      close();
    } catch (error: any) {
      console.log(
        error.response?.data?.message
          ? error.response?.data?.message
          : "step changes faild"
      );
    }
  };

  const handleFinish = async (activeIndex: number) => {
    try {
      const { data } = await finishStepper(projectId, activeIndex);
      close();
    } catch (error: any) {
      console.log(
        error.response?.data?.message
          ? error.response?.data?.message
          : "step changes faild"
      );
    }
  };

  return (
    <Dialog maxWidth="sm" open={open} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions style={{ padding: "0 25px 20px 20px" }}>
        <Button variant="contained" color="error" onClick={handleAction}>
          yes
        </Button>
        <Button variant="contained" onClick={close}>
          no
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmStep;
