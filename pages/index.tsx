import type { GetStaticProps, NextPage } from 'next'

import ProjectListTemplate from '@components/templates/ProjectListTemplate'
import ProjectGridTemplate from '@components/templates/ProjectGridTemplate'
import { useProjectLayout } from '@components/contexts/ProjectLayoutContext'

import * as contentful from '@services/contentful'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import { TypeProjectsListFields } from '@services/contentful/types'
import { motion } from 'framer-motion'

type TProps = {
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

const Home: NextPage<TProps> = ({ projectsList }) => {
  const { mode, nextMode, transitioning, transitioningIn, transitionInComplete } = useProjectLayout()

  return (
    <div className="relative">
      {(mode === 'grid' || transitioning) &&
        <div className="absolute lg:fixed lg:p-[132px] top-0 left-0 right-0 width-full" style={{ zIndex: transitioning && nextMode === 'grid' ? 2 : 1 }}>
          <ProjectGridTemplate projectsList={projectsList} />
        </div>
      }
      {(mode === 'list' || transitioning) &&
        <motion.div
          className="relative"
          style={{ zIndex: transitioning && nextMode === 'list' ? 2 : 1 }}
          animate={{ opacity: (!transitioning && mode === 'list') || (transitioningIn && nextMode === 'list') ? 1 : 0 }}
          initial={{ opacity: transitioning && nextMode === 'list' ? 0 : 1 }}
          onAnimationComplete={transitionInComplete}
        >
          <ProjectListTemplate projectsList={projectsList} />
        </motion.div>
      }
    </div>
  )
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
