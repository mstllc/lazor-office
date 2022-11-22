import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'

import * as contentful from '@services/contentful'
import { TypeProjectFields, TypeProjectsListFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import ProjectTemplate from '@components/templates/ProjectTemplate'

type TProps = {
  slug: string
  project: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectFields>
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

const ProjectPage: NextPage<TProps> = ({ slug, project, projectsList }) => {
  return (
    <ProjectTemplate slug={slug} project={project} projectsList={projectsList} />
  )
}

export default ProjectPage

export const getStaticPaths: GetStaticPaths = async () => {
  const projectsList = await contentful.getProjectsList()

  const paths = projectsList.fields.projects!.map(project => ({
    params: { slug: project.fields.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const projectsList = await contentful.getProjectsList()
  const project = projectsList.fields.projects!.find(project => project.fields.slug === context.params!.slug)

  if (!project) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      slug: context.params!.slug,
      project,
      projectsList
    }
  }
}
