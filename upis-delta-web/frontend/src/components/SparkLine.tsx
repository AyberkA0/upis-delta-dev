export default function SparkLine({ color }: { color: string }) {
  const base = [40, 55, 38, 62, 50, 70, 45, 80, 60, 75, 55, 85, 65, 78, 90]

  const shuffled = [...base].sort(() => Math.random() - 0.5)

  const values = shuffled.reduce<number[]>((acc, v, i) => {
    if (i === 0) {
      acc.push(v)
      return acc
    }

    const prev = acc[i - 1]

    let next = v
    let tries = 0

    while (Math.abs(next - prev) < prev * 0.2 && tries < 20) {
      next = shuffled[Math.floor(Math.random() * shuffled.length)]
      tries++
    }

    const drift = (Math.random() - 0.5) * 8
    const smooth = prev * 0.5 + next * 0.5 + drift

    acc.push(Math.max(20, Math.min(100, smooth)))
    return acc
  }, [])

  const max = Math.max(...values)
  const min = Math.min(...values)

  const h = 60
  const w = 200

  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * h
    return { x, y }
  })

  const d = pts.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x},${p.y}`
    const prev = arr[i - 1]
    const cx = (prev.x + p.x) / 2
    const cy = (prev.y + p.y) / 2
    return `${acc} Q ${prev.x},${prev.y} ${cx},${cy}`
  }, "")

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <defs>
        <filter id="g">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="4"
        opacity="0.25"
        filter="url(#g)"
      />

      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}