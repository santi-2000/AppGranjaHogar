import Svg, { Path } from 'react-native-svg'

export default function ChevronUpIcon({ size = 20, color = '#1E1E1E' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M15 12.5L10 7.5L5 12.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
