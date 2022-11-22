import { TypeProjectHotspotsBlockFields } from '@services/contentful/types'
import { Entry } from 'contentful'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer'
import { Document, BLOCKS } from '@contentful/rich-text-types'

import styles from './ProjectHotspotsBlock.module.scss'

const richTextRenderOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const file = node.data.target.fields.file
      return (
        <Image
          src={`https://${file.url}`}
          alt={node.data.target.fields.title}
          width={file.details.image.width}
          height={file.details.image.height}
          sizes="(max-width: 1024px) 75vw, 25vw"
        />
      )
    }
  }
}

type TProps = {
  block: Entry<TypeProjectHotspotsBlockFields>
}

function ProjectHotspotsBlock({ block }: TProps) {
  const [leftHotspot, setLeftHotspot] = useState<HTMLButtonElement | null>(null)
  const [rightHotspot, setRightHotspot] = useState<HTMLButtonElement | null>(null)
  const [leftHotspotContent, setLeftHotspotContent] = useState<HTMLDivElement | null>(null)
  const [rightHotspotContent, setRightHotspotContent] = useState<HTMLDivElement | null>(null)
  const [leftArrow, setLeftArrow] = useState<HTMLDivElement | null>(null)
  const [rightArrow, setRightArrow] = useState<HTMLDivElement | null>(null)
  const [leftHotspotOpen, setLeftHotspotOpen] = useState(false)
  const [rightHotspotOpen, setRightHotspotOpen] = useState(false)
  const { styles: leftStyles, attributes: leftAttributes } = usePopper(leftHotspot, leftHotspotContent, {
    modifiers: [
      { name: 'arrow', options: { element: leftArrow } },
      { name: 'offset', options: { offset: [0, 8] } }
    ]
  })
  const { styles: rightStyles, attributes: rightAttributes } = usePopper(rightHotspot, rightHotspotContent, {
    modifiers: [
      { name: 'arrow', options: { element: rightArrow } },
      { name: 'offset', options: { offset: [0, 8] } }
    ]
  })

  const onDocumentClick = useCallback((e: MouseEvent) => {
    if (leftHotspot && leftHotspotContent) {
      const path = e.composedPath()
      if (!path.includes(leftHotspotContent) && !path.includes(leftHotspot)) {
        setLeftHotspotOpen(false)
      }
    }

    if (rightHotspot && rightHotspotContent) {
      const path = e.composedPath()
      if (!path.includes(rightHotspotContent) && !path.includes(rightHotspot)) {
        setRightHotspotOpen(false)
      }
    }
  }, [leftHotspot, leftHotspotContent, rightHotspot, rightHotspotContent])

  useEffect(() => {
    document.addEventListener('click', onDocumentClick)

    return () => {
      document.removeEventListener('click', onDocumentClick)
    }
  }, [onDocumentClick])

  return (
    <div className={styles.root}>
      <div className={styles['image-wrapper']}>
        <div className={styles.image}>
          <Image
            src={`https://${block.fields.leftImage.fields.file!.url}`}
            alt={block.fields.leftImage.fields.title}
            width={block.fields.leftImage.fields.file!.details.image?.width}
            height={block.fields.leftImage.fields.file!.details.image?.height}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {block.fields.leftHotspotContent && (
            <>
              <button
                ref={setLeftHotspot}
                className={styles.hotspot}
                style={{
                  top: `${block.fields.leftHotspotPositionTop !== undefined ? block.fields.leftHotspotPositionTop : 50}%`,
                  left: `${block.fields.leftHotspotPositionLeft !== undefined ? block.fields.leftHotspotPositionLeft : 50}%`
                }}
                onClick={() => setLeftHotspotOpen(!leftHotspotOpen)}
              />
              {leftHotspotOpen &&
                <div className={styles.content} ref={setLeftHotspotContent} style={leftStyles.popper} {...leftAttributes.popper}>
                  {documentToReactComponents(block.fields.leftHotspotContent as Document, richTextRenderOptions)}
                  <div ref={setLeftArrow} className={styles.arrow} style={leftStyles.arrow} />
                </div>
              }
            </>
          )}
        </div>
      </div>
      <div className={styles['image-wrapper']}>
        <div className={styles.image}>
          <Image
            src={`https://${block.fields.rightImage.fields.file!.url}`}
            alt={block.fields.rightImage.fields.title}
            width={block.fields.rightImage.fields.file!.details.image?.width}
            height={block.fields.rightImage.fields.file!.details.image?.height}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {block.fields.rightHotspotContent && (
            <>
              <button
                ref={setRightHotspot}
                className={styles.hotspot}
                style={{
                  top: `${block.fields.rightHotspotPositionTop !== undefined ? block.fields.rightHotspotPositionTop : 50}%`,
                  left: `${block.fields.rightHotspotPositionLeft !== undefined ? block.fields.rightHotspotPositionLeft : 50}%`
                }}
                onClick={() => setRightHotspotOpen(!rightHotspotOpen)}
              />
              {rightHotspotOpen &&
                <div className={styles.content} ref={setRightHotspotContent} style={rightStyles.popper} {...rightAttributes.popper}>
                  {documentToReactComponents(block.fields.rightHotspotContent as Document, richTextRenderOptions)}
                  <div ref={setRightArrow} className={styles.arrow} style={rightStyles.arrow} />
                </div>
              }
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectHotspotsBlock
