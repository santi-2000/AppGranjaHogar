import { Svg, Path } from 'react-native-svg'

export default function ArrowRight({ size = 24, color = '#757575' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.09143 18L14.8656 12L9.09143 6"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
