import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg'

export default function BoxIcon({ size = 24, color = '#757575' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <G clipPath="url(#clip0_85_378)">
        <Path
          d="M21 8V21H3V8M10 12H14M1 3H23V8H1V3Z"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_85_378">
          <Rect width={24} height={24} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
