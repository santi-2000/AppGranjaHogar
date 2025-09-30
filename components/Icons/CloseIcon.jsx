import Svg, { Path } from 'react-native-svg'

export default function CloseIcon({ size = 16, color = '#1E1E1E' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M12 4L4 12M4 4L12 12"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
