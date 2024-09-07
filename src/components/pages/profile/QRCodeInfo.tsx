import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; 
import logo from "../../../assets/scan2.svg";
import { Box, Paper, Button, TextField, InputAdornment, Typography } from "@mui/material";
import theme from "../../../theme";
import { ImportCurve } from "iconsax-react";

type Props = {
  storeData: StoreT;
};

const QRCodeInfo: React.FC<Props> = ({ storeData }) => {
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const downloadPNG = () => {
    if (qrRef.current) {
      const canvas = qrRef.current;
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${storeData.name}_QRCode.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Box
      component={Paper}
      width={"100%"}
      className="p-6 space-y-5 m-0 flex flex-col justify-end items-center"
    >
      <Box className="space-y-2 m-0 flex flex-col justify-end items-center">
        <QRCodeCanvas
          ref={qrRef}
          value={`https://scanbuy2.liara.run/${storeData.store_id}`}
          title={"Title for my QR Code"}
          size={200}
          bgColor={"#ffffff"}
          fgColor={theme.palette.text.primary}
          level={"Q"}
          marginSize={0}
          imageSettings={{
            src: logo,
            x: undefined,
            y: undefined,
            height: 45,
            width: 45,
            opacity: 1,
            excavate: true,
          }}
        /></Box>
       <Box className="flex w-full items-center gap-2">
       <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{minHeight:38 , borderRadius:2}}
          onClick={downloadPNG}
          // endIcon={<ImportCurve />}
        >
         <ImportCurve />
        </Button>
      
      
      <TextField
        id="outlined-start-adornment"
        size="small"
        fullWidth
        value={`scanbuy2.liara.run/${storeData.store_id}`}
        sx={{ direction: "ltr" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography sx={{ color: theme.palette.primary.main }}>
                https://
              </Typography>
            </InputAdornment>
          ),
        }}
      /> </Box>
    </Box>
  );
};

export default QRCodeInfo;
