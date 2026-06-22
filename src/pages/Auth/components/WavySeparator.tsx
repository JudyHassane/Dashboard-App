import { authStyles } from "../../../styles/authStyles";
import { colors } from "../../../styles/colors";

export default function WavySeparator() {
  return (
    <>
      {/* Desktop Vertical Wave */}
      <svg
        className={authStyles.decoration.waveSvg}
        viewBox="0 0 150 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 0 L 95 0 C 130 90, 55 140, 85 220 C 115 300, 150 340, 105 430 C 65 510, 125 580, 95 660 C 65 740, 125 810, 105 900 L 0 900 Z"
          fill={colors.background.paper.light}
        />
      </svg>

      {/* Mobile Horizontal Wave */}
      <svg
        className={authStyles.decoration.waveSvgMobile}
        viewBox="0 0 900 150"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 150 L 0 55 C 90 20, 140 95, 220 65 C 300 35, 340 0, 430 45 C 510 85, 580 25, 660 55 C 740 85, 810 25, 900 45 L 900 150 Z"
          fill={colors.background.paper.light}
        />
      </svg>
    </>
  );
}
