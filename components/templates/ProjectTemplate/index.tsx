import FooterNav from '@components/shared/FooterNav'
import ProjectDetailsBlock from '@components/shared/ProjectDetailsBlock'
import ProjectHotspotsBlock from '@components/shared/ProjectHotspotsBlock'
import ProjectImagesBlock from '@components/shared/ProjectImagesBlock'
import ProjectQuoteBlock from '@components/shared/ProjectQuoteBlock'
import ProjectRecognitionBlock from '@components/shared/ProjectRecognitionBlock'
import ViewProjectsStack from '@components/shared/ViewProjectsStack'
import StaggeredHeadline from '@components/shared/StaggeredHeadline'
import { TypeProjectDetailsFields, TypeProjectFields, TypeProjectHotspotsBlockFields, TypeProjectImagesBlockFields, TypeProjectQuoteBlockFields, TypeProjectRecognitionBlockFields, TypeProjectsListFields } from '@services/contentful/types'
import { Entry, EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import styles from './ProjectTemplate.module.scss'

type TProps = {
  project: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectFields>
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
  clip?: boolean
}

function ProjectTemplate({ project, projectsList, clip }: TProps) {
  const router = useRouter()
  const crop = project.fields.heroImage!.fields.projectListCrop as { width: number, height: number }

  return (
    <div className={styles.root}>
      <Image
        className={styles.hero}
        src={`https:${project.fields.heroImage?.fields.image?.fields.file?.url}`}
        alt={project.fields.projectName}
        width={project.fields.heroImage?.fields.image?.fields.file?.details.image?.width}
        height={project.fields.heroImage?.fields.image?.fields.file?.details.image?.height}
        sizes="100vw"
        data-project-hero
        {...(clip && { style: { clipPath: `inset(${(100 - crop.height * 100) / 2}% ${(100 - crop.width * 100) / 2}%)` } })}
        onTransitionEnd={() => router.push(`/projects/${project.fields.slug}`, undefined, { shallow: true })}
      />

      <div className={styles.header}>
        <StaggeredHeadline lines={[`${project.fields.projectName}–`, project.fields.location]} />
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
