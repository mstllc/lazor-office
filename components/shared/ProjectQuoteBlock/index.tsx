import { TypeProjectQuoteBlockFields } from '@services/contentful/types/TypeProjectQuoteBlock'
import { Entry } from 'contentful'
import Image from 'next/image'
import React from 'react'

import styles from './ProjectQuoteBlock.module.scss'

type TProps = {
  block: Entry<TypeProjectQuoteBlockFields>
}

function ProjectQuoteBlock({ block }: TProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.quote}>”{block.fields.quote}”</h3>
      {block.fields.attribution &&
        <p className={styles.attribution}>– {block.fields.attribution}</p>
      }
    </div>
  )
}

export default ProjectQuoteBlock
