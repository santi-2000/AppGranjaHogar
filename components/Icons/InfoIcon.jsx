import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg'

export default function InfoIcon({ size = 21, color = '#C71919' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
    >
      <G clipPath="url(#clip0_85_372)">
        <Path
          d="M10.5 14V10.5M10.5 7H10.5088M19.25 10.5C19.25 15.3325 15.3325 19.25 10.5 19.25C5.66751 19.25 1.75 15.3325 1.75 10.5C1.75 5.66751 5.66751 1.75 10.5 1.75C15.3325 1.75 19.25 5.66751 19.25 10.5Z"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_85_372">
          <Rect width={21} height={21} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
