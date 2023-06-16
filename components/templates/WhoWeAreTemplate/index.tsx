import FooterNav from '@components/shared/FooterNav'
import { TypeProjectsListFields, TypeWhoWeArePageFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Icon from '@components/shared/Icon'
import Slider from 'react-slick'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import React from 'react'

import styles from './WhoWeAreTemplate.module.scss'
import StaggeredHeadline from '@components/shared/StaggeredHeadline'
import { useState, useRef, useCallback } from 'react'
import ViewProjectsStack from '@components/shared/ViewProjectsStack'

type TProps = {
  pageData: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeWhoWeArePageFields>
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

const WhoWeAreTemplate = ({ pageData, projectsList }: TProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)

  const onPrevSlideClick = useCallback(() => {
    sliderRef.current?.slickPrev()
  }, [sliderRef])

  const onNextSlideClick = useCallback(() => {
    sliderRef.current?.slickNext()
  }, [sliderRef])

  return (
    <div className={styles.root}>
      <div className={styles.headline}>
        <StaggeredHeadline
          lines={['A team built to create', 'personal ipsum doler.']}
          linesXS={['A team built to', 'create personal', 'ipsum doler.']}
        />
      </div>
      <div className="flex flex-col-reverse lg:flex-col">
        <div className={styles.body}>
          {documentToReactComponents(pageData.fields.body as Document)}
        </div>
        <div className={styles.poem}>
          <div className={styles.slider}>
            <button onClick={onPrevSlideClick}><Icon name="LeftCaret" /></button>
            <Slider
              ref={sliderRef}
              dots={false}
              arrows={false}
              afterChange={(slide) => setCurrentSlide(slide)}
            >
              {pageData.fields.slides?.map(field => (
                <div key={field.sys.id} className={styles.slide}>
                  <Image
                    src={`https:${field.fields.image.fields.file!.url}`}
                    alt={field.fields.image!.fields.title}
                    width={field.fields.image.fields.file!.details.image?.width}
                    height={field.fields.image.fields.file!.details.image?.height}
                    sizes='100vw'
                  />
                  {field.fields.caption && (
                    <div className={styles.caption}>
                      <p>{field.fields.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </Slider>
            <button onClick={onNextSlideClick}><Icon name="RightCaret" /></button>
          </div>
        </div>
      </div>
      <div className={styles.bios}>
        {pageData.fields.bios?.map((field, index) => (
          <div key={index} className={styles.bio}>
            <p className={styles.title}>{field.fields.title}</p>
            <h6 className={styles.name}>{field.fields.name}</h6>
            <div className={styles.image}>
              <Image
                src={`https:${field.fields.image.fields.file!.url}`}
                alt={field.fields.image!.fields.title}
                width={field.fields.image.fields.file!.details.image?.width}
                height={field.fields.image.fields.file!.details.image?.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {field.fields.quote && <p className={styles.quote}>‘{field.fields.quote}’</p>}
            <div className={styles.detail}>
              {field.fields.details && (
                <div className={styles.details}>
                  {(Object.entries(field.fields.details as Record<string, { id: string; key: string; value: string }>)).map(([index, entry]) => (
                    <React.Fragment key={index}>
                      <p>{entry.key}</p>
                      <p>{entry.value}</p>
                    </React.Fragment>
                  ))}
                </div>
              )}
              <div className={styles['bio-body']}>
                {documentToReactComponents(field.fields.body as Document)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ViewProjectsStack projectsList={projectsList} />

      <FooterNav />
    </div>
  )
}

export default WhoWeAreTemplate
