import { Box, Typography } from "@mui/material";
import { FC, useState } from "react";

type Props = {
  mode: "view" | "preview";
};
const colors = [
  ["#FF6B6B", "#556270"],
  ["#48C6EF", "#6F86D6"],
  ["#4ECDC4", "#556270"],
  ["#E1DEFA", "#737373"],
  ["#FFD166", "#3A1C71"],
];
const getRandomGradient = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

function formatCreditCardNumber(
  creditCardNumber: string,
  mode: "view" | "preview"
): string {
  // ابتدا 4 رقم آخر شماره کارت را به جداولی از دو رقم تقسیم کنید
  const lastFourDigits = creditCardNumber.substring(
    creditCardNumber.length - 4
  );
  // دایره‌ای به جای اعداد اولیه قرار دهید
  const maskedFirstDigits = "●●●● ●●●● ●●●●";
  // ادغام قسمت های اصلاح شده شماره کارت
  if (mode === "view") return maskedFirstDigits + " " + lastFourDigits;
  else return lastFourDigits;
}
const CreditCard: FC<Props> = ({ mode }) => {
  const [gradientColors, setGradientColors] = useState(getRandomGradient());

  const changeGradient = () => {
    setGradientColors(getRandomGradient());
  };

  const creditCardNumber = "1234567812345678";
  const formattedNumber = formatCreditCardNumber(creditCardNumber, mode);
  return (
    <>
      {mode === "view" ? (
        <Box
          sx={{
            width: "100%",
            minHeight: "200px",
            direction: "ltr",
            padding: "21px",
            borderRadius: "7px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})`,
            transition: "background 0.3s ease-in-out",
            color: "white",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box className="flex justify-between">
            <Typography variant="subtitle1" fontWeight="bold">
              -100000000000
            </Typography>
            <Typography variant="subtitle2">تجارت</Typography>
          </Box>
          <Typography>{formattedNumber}</Typography>
          <Box className="flex justify-between">
            <Typography>شرکت مهرآوه بای‌نت</Typography>

            <Box className="flex w-fit">
              <Box
                bgcolor={gradientColors[1]}
                className=" w-8 h-8 rounded-full -mr-4 mix-blend-multiply"
              />
              <Box
                bgcolor={gradientColors[0]}
                className="bg-white w-8 h-8 rounded-full mix-blend-lighten"
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ borderRight: "1px solid red", pr: 2 }}>
          <Box
            sx={{
              width: "50px",
              height: "35px",
              direction: "ltr",
              padding: "5px",
              borderRadius: "7px",

              background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})`,
              transition: "background 0.3s ease-in-out",
              color: "white",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Typography variant="caption">{formattedNumber}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
export default CreditCard;
