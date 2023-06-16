import { GetStaticProps, NextPage } from 'next'
import WhoWeAreTemplate from '@components/templates/WhoWeAreTemplate'
import { TypeProjectsListFields, TypeWhoWeArePageFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import * as contentful from '@services/contentful'

type TProps = {
  whoWeArePage: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeWhoWeArePageFields>
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

const WhoWeArePage: NextPage<TProps> = ({ whoWeArePage, projectsList }) => {
  return (
    <WhoWeAreTemplate pageData={whoWeArePage} projectsList={projectsList} />
  )
}

export default WhoWeArePage


export const getStaticProps: GetStaticProps = async (context) => {
  const projectsList = await contentful.getProjectsList(context.preview)
  const whoWeArePage = await contentful.getWhoWeArePage(context.preview)

  return {
    props: {
      projectsList,
      whoWeArePage
    }
  }
}
