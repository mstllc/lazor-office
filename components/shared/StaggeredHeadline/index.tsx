import styles from './StaggeredHeadline.module.scss'

type TProps = {
  lines: string[]
  linesXS?: string[]
}

const StaggeredHeadline = ({ lines, linesXS }: TProps) => {
  return (
    <div className={styles.root}>
      <h1 className={styles.xs}>
        {(linesXS || lines).map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </h1>
      <h1 className={styles.lg}>
        {lines.map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </h1>
    </div>
  )
}

export default StaggeredHeadline
