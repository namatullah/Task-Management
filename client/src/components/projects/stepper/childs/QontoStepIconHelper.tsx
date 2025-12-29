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

const QontoStepIconHelper = (props: StepIconProps) => {
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
};

export default QontoStepIconHelper;
