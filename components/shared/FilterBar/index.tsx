import clsx from 'clsx'
import { motion } from 'framer-motion'
import { ReactNode, useCallback, useState } from 'react'
import Icon from '../Icon'
import styles from './FilterBar.module.scss'

type TFilterBarItem = {
  value: string
  label: string
  count?: number
}

interface IFilterBarProps {
  title: string
  categories: TFilterBarItem[]
  onFilterChange: (category: string) => void
  renderRightButton?: () => ReactNode
  className?: string
}

const FilterBar = ({ title, categories, onFilterChange, renderRightButton, className }: IFilterBarProps) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const onFilterClick = useCallback((e: React.MouseEvent, category: string) => {
    e.preventDefault()

    onFilterChange(category)

    setMobileFilterOpen(false)
  }, [onFilterChange])

  const rootClassName = clsx(styles.root, className && className)

  return (
    <div className={rootClassName}>
      <button className={styles['filter-bar']} onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
        {title}
        <motion.div animate={{ rotate: mobileFilterOpen ? 180 : 0 }}>
          <Icon name="DownCaret" />
        </motion.div>
      </button>
      <motion.div className={styles['filter-menu']} animate={{ height: mobileFilterOpen ? 'auto' : 0 }} initial={false}>
        <div className={styles['filter-options']}>
          {categories.map((category, index) => (
            <a key={index} href="#" onClick={(e) => { onFilterClick(e, category.value) }}>
              {category.label}
              {typeof category.count === 'number' && <sup>{category.count}</sup>}
            </a>
          ))}
        </div>
        <div className={styles['right-button']}>{renderRightButton && renderRightButton()}</div>
      </motion.div>
    </div>
  )
}

export default FilterBar
