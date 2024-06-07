import { StarHalfRounded, StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import { FC } from "react";
import _ from "lodash";

interface Props {
  rating: number;
}

function roundHalf(num: number) {
  return Math.round(num * 2) / 2;
}

const MAX_RATING = 5;

const StarRating: FC<Props> = ({ rating }) => {
  const roundedRating = roundHalf(rating);

  const containsHalf = Math.round(roundedRating) !== roundedRating;

  const fullStarCount = Math.floor(roundedRating);
  const actualMax = containsHalf ? MAX_RATING - 1 : MAX_RATING;

  return (
    <Box>
      {_.range(fullStarCount).map((_r) => (
        <StarRounded color="gold" />
      ))}
      {containsHalf && <StarHalfRounded sx={{ transform: "scale(-1,1)" }} color="gold" />}
      {roundedRating < MAX_RATING &&
        _.range(roundedRating, actualMax).map((_r) => <StarOutlineRounded color="disabled" />)}
    </Box>
  );
};

export default StarRating;
