import Svg, { Path } from 'react-native-svg'

export default function ArrowRightBarIcon({ size = 22, color = '#1E1E1E', rotate = 0 }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      style={{ transform: [{ rotate: `${rotate}deg` }] }}
    >
      <Path
        d="M20.3334 11H1.66675M1.66675 11L11.0001 20.3333M1.66675 11L11.0001 1.66666"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}