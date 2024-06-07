import { FC, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  StepConnectorProps,
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { useMediaQuery } from "@mui/material";
import theme from "../../../theme";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

type Props = {
  steps: StepT[];
  activeIndex: number;
};

interface QontoConnectorProps extends StepConnectorProps {
  isMinimal?: boolean;
}

const QontoConnector = styled(StepConnector, {
  shouldForwardProp: (prop) => prop !== "isMinimal",
})<QontoConnectorProps>(({ theme, isMinimal }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: isMinimal ? 10 : 25,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "white",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: theme.palette.primary.main,
    }),
    "& .QontoStepIcon-completedIcon": {
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: ownerState.active ? 16 : 8,
      height: ownerState.active ? 16 : 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
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

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "white",
  zIndex: 1,
  color: theme.palette.primary.main,
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    border: `dashed 1px ${theme.palette.primary.main}`,
    backgroundColor: "white",
    color: theme.palette.primary.main,
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, icon } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icon}
    </ColorlibStepIconRoot>
  );
}
const CustomizedStepper: FC<Props> = ({ steps , activeIndex }) => {
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const stepNumber = steps.length;
  const [isMinimal, setIsMinimal] = useState(false);

  useEffect(() => {
    if (stepNumber > 4 && !isMdScreen) {
      setIsMinimal(true);
    } else {
      setIsMinimal(false);
    }
  }, [isMdScreen, steps, stepNumber]);

  return (
    <Stack sx={{ width: "100%" }}>
      <CacheProvider value={cacheRtl}>
        <Stepper
          sx={{ direction: "ltr", width: "100%" }}
          alternativeLabel
          activeStep={activeIndex}
          connector={<QontoConnector isMinimal={isMinimal} />}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={
                  isMdScreen
                    ? (props) => (
                        <ColorlibStepIcon {...props} icon={step.icon} />
                      )
                    : stepNumber < 5
                    ? (props) => (
                        <ColorlibStepIcon {...props} icon={step.icon} />
                      )
                    : QontoStepIcon
                }
              >
                {isMdScreen ? step.name : <></>}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </CacheProvider>
    </Stack>
  );
};
export default CustomizedStepper;
