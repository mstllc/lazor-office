import type { GetStaticProps, NextPage } from 'next'

import ProjectListTemplate from '@components/templates/ProjectListTemplate'

import * as contentful from '@services/contentful'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import { TypeProjectsListFields } from '@services/contentful/types'

type TProps = {
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

const Home: NextPage<TProps> = ({ projectsList }) => {
  return <ProjectListTemplate projectsList={projectsList} />
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const projectsList = await contentful.getProjectsList()

  return {
    props: {
      projectsList
    }
  }
}
