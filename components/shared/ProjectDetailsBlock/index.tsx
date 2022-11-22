import { TypeProjectDetailsFields } from '@services/contentful/types'
import { Entry } from 'contentful'
import React from 'react'

import styles from './ProjectDetailsBlock.module.scss'

type TProps = {
  block: Entry<TypeProjectDetailsFields>
}

function ProjectDetailsBlock({ block }: TProps) {
  console.log(block.fields.fields)
  return (
    <div className={styles.root}>
      <h2>Project Details</h2>
      <div className={styles.fields}>
        {Object.entries(block.fields.fields as Record<string, { id: string; key: string; value: string }>).map(([index, entry]) => {
          return (
            <div key={entry.id} className={styles.field}>
              <p>{entry.key}:</p>
              <p>{entry.value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectDetailsBlock
