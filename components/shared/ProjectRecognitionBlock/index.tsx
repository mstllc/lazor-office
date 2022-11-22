import { TypeProjectRecognitionBlockFields } from '@services/contentful/types'
import { Entry } from 'contentful'
import Image from 'next/image'
import React from 'react'

import styles from './ProjectRecognitionBlock.module.scss'

type TProps = {
  block: Entry<TypeProjectRecognitionBlockFields>
}

function ProjectRecognitionBlock({ block }: TProps) {
  return (
    <div className={styles.root}>
      <h2>{block.fields.title || 'Awards'}</h2>
      <div className={styles.recognitions}>
        {block.fields.recognitions.map(recognition => {
          const image = recognition.fields.projectPageImage || recognition.fields.image

          return (
            <div key={recognition.sys.id} className={styles.recognition}>
              <Image
                src={`https:${image.fields.file!.url}`}
                alt={image.fields.title}
                width={image.fields.file!.details.image?.width}
                height={image.fields.file!.details.image?.height}
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <p>{recognition.fields.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectRecognitionBlock
