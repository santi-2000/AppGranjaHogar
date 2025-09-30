import Svg, { Path } from 'react-native-svg'

export default function ChevronDownIcon({ size = 20, color = '#1E1E1E' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M5 7.5L10 12.5L15 7.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
