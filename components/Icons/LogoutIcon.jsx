import Svg, { Path } from 'react-native-svg'

export default function LogoutIcon({ size = 25, color = '#A81B1B' }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M9.375 21.875H5.20833C4.6558 21.875 4.12589 21.6555 3.73519 21.2648C3.34449 20.8741 3.125 20.3442 3.125 19.7917V5.20833C3.125 4.6558 3.34449 4.12589 3.73519 3.73519C4.12589 3.34449 4.6558 3.125 5.20833 3.125H9.375M16.6667 17.7083L21.875 12.5M21.875 12.5L16.6667 7.29167M21.875 12.5H9.375"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
