import Svg, { Path } from 'react-native-svg'

export default function AddIcon({ size = 22, color = '#1D8445' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
    >
      <Path
        d="M11 7V15M7 11H15M4 2H18C19.1046 2 20 2.89543 20 4V18C20 19.1046 19.1046 20 18 20H4C2.89543 20 2 19.1046 2 18V4C2 2.89543 2.89543 2 4 2Z"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
