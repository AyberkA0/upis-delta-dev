export default function SparkLine({ color }: { color: string }) {
  const points = [40, 55, 38, 62, 50, 70, 45, 80, 60, 75, 55, 85, 65, 78, 90]
  const max = Math.max(...points)
  const min = Math.min(...points)
  const h = 60
  const w = 200
  const pts = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / (max - min)) * h
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}