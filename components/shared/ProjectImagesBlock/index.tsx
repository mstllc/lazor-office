import { TypeProjectImagesBlockFields } from '@services/contentful/types'
import { Entry } from 'contentful'
import Image from 'next/image'
import React, { useState, useRef, useCallback } from 'react'
import Slider from 'react-slick'

import styles from './ProjectImagesBlock.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Icon from '../Icon'
import clsx from 'clsx'

type TProps = {
  block: Entry<TypeProjectImagesBlockFields>
}

function ProjectImagesBlock({ block }: TProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)

  const onPrevSlideClick = useCallback(() => {
    sliderRef.current?.slickPrev()
  }, [sliderRef])

  const onNextSlideClick = useCallback(() => {
    sliderRef.current?.slickNext()
  }, [sliderRef])

  if (block.fields.images.length === 1) {
    const hasText = block.fields.headline || block.fields.body
    const textOnLeft = !!block.fields.textOnLeft
    const singleRootClassname = clsx(styles['single-root'], hasText && styles['has-text'], textOnLeft && styles['text-on-left'])

    return (
      <div className={singleRootClassname}>
        <div className={styles.image}>
          <Image
            src={`https:${block.fields.images[0].fields.file!.url}`}
            alt={block.fields.images[0].fields.title}
            width={block.fields.images[0].fields.file!.details.image?.width}
            height={block.fields.images[0].fields.file!.details.image?.height}
            sizes='100vw'
          />
        </div>
        {hasText && (
          <div className={styles.content}>
            <div className={styles['content-inner']}>
              {block.fields.headline && <h2>{block.fields.headline}</h2>}
              {block.fields.body && <p>{block.fields.body}</p>}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.slider}>
        <button onClick={onPrevSlideClick}><Icon name="LeftCaret" /></button>
        <Slider
          ref={sliderRef}
          dots={false}
          arrows={false}
          afterChange={(slide) => setCurrentSlide(slide)}
        >
          {block.fields.images.map(field => (
            <div key={field.sys.id} className={styles.slide}>
              <Image
                src={`https:${field.fields.file!.url}`}
                alt={field.fields.title}
                width={field.fields.file!.details.image?.width}
                height={field.fields.file!.details.image?.height}
                sizes='100vw'
              />
            </div>
          ))}
        </Slider>
        <button onClick={onNextSlideClick}><Icon name="RightCaret" /></button>
      </div>
      <div className={styles.below}>
        <p className={styles.pagination}>{currentSlide + 1}/{block.fields.images.length}</p>
        {(block.fields.headline || block.fields.body) && (
          <div className={styles.content}>
            {block.fields.headline && <h2>{block.fields.headline}</h2>}
            {block.fields.body && <p>{block.fields.body}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectImagesBlock
