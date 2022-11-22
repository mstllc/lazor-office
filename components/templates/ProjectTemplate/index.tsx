import FooterNav from '@components/shared/FooterNav'
import ProjectDetailsBlock from '@components/shared/ProjectDetailsBlock'
import ProjectHotspotsBlock from '@components/shared/ProjectHotspotsBlock'
import ProjectImagesBlock from '@components/shared/ProjectImagesBlock'
import ProjectQuoteBlock from '@components/shared/ProjectQuoteBlock'
import ProjectRecognitionBlock from '@components/shared/ProjectRecognitionBlock'
import ViewProjectsStack from '@components/shared/ViewProjectsStack'
import { TypeProjectDetailsFields, TypeProjectFields, TypeProjectHotspotsBlockFields, TypeProjectImagesBlockFields, TypeProjectQuoteBlockFields, TypeProjectRecognitionBlockFields, TypeProjectsListFields } from '@services/contentful/types'
import { Entry, EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import Image from 'next/image'
import React from 'react'

import styles from './ProjectTemplate.module.scss'

type TProps = {
  slug: string
  project: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectFields>
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

function ProjectTemplate({ slug, project, projectsList }: TProps) {
  console.log(`https:${project.fields.heroImage?.fields.image?.fields.file?.url}`)
  return (
    <div className={styles.root}>
      <Image
        src={`https:${project.fields.heroImage?.fields.image?.fields.file?.url}`}
        alt={project.fields.projectName}
        width={project.fields.heroImage?.fields.image?.fields.file?.details.image?.width}
        height={project.fields.heroImage?.fields.image?.fields.file?.details.image?.height}
        sizes="100vw"
      />

      <div className={styles.header}>
        <h1>{project.fields.projectName}–</h1>
        <h1>{project.fields.location}</h1>
        <div className={styles.intro}>
          <h3>{project.fields.headline}</h3>
          {project.fields.intro.split(/\r?\n/).filter(text => !!text.trim()).map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>

      {project.fields.blocks?.map(block => {
        switch (block.sys.contentType.sys.id) {
          case 'projectImagesBlock':
            return <ProjectImagesBlock key={block.sys.id} block={block as Entry<TypeProjectImagesBlockFields>} />
          case 'projectDetails':
            return <ProjectDetailsBlock key={block.sys.id} block={block as Entry<TypeProjectDetailsFields>} />
          case 'projectHotspotsBlock':
            return <ProjectHotspotsBlock key={block.sys.id} block={block as Entry<TypeProjectHotspotsBlockFields>} />
          case 'projectQuoteBlock':
            return <ProjectQuoteBlock key={block.sys.id} block={block as Entry<TypeProjectQuoteBlockFields>} />
          case 'projectRecognitionBlock':
            return <ProjectRecognitionBlock key={block.sys.id} block={block as Entry<TypeProjectRecognitionBlockFields>} />
          default:
            return null;
        }
      })}

      <ViewProjectsStack projectsList={projectsList} />

      <FooterNav />
    </div>
  )
}

export default ProjectTemplate
