import Svg, { Path } from 'react-native-svg'

export default function FolderPlusIcon({ size = 24, color = '#1D8445' }) {
  return (
    <Svg
      width={size}
      height={(size * 22) / 24}
      viewBox="0 0 24 22"
      fill="none"
    >
      <Path
        d="M12 10V16M9 13H15M22 18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H9L11 5H20C20.5304 5 21.0391 5.21071 21.4142 5.58579C21.7893 5.96086 22 6.46957 22 7V18Z"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
