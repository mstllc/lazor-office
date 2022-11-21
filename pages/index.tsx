import type { GetStaticProps, NextPage } from 'next'

import ProjectListTemplate from '@components/templates/ProjectListTemplate'
import ProjectGridTemplate from '@components/templates/ProjectGridTemplate'
import { useProjectLayout } from '@components/contexts/ProjectLayoutContext'

import * as contentful from '@services/contentful'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import { TypeProjectsListFields } from '@services/contentful/types'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

type TProps = {
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

const Home: NextPage<TProps> = ({ projectsList }) => {
  const router = useRouter()
  const params = Object.fromEntries(new URLSearchParams(router.asPath.includes('?') ? router.asPath.split('?').pop() : ''))
  const category = params.category
  const { mode, nextMode, transitioning, transitioningIn, transitionInComplete } = useProjectLayout()

  const filteredProjectsList = useMemo(() => {
    let projects = projectsList.fields.projects
    if (!category) {
      projects = projectsList.fields.projects!.filter(project => project.fields.showOnHome)
    } else {

      switch (category) {
        case 'home':
          projects = projectsList.fields.projects!.filter(project => project.fields.projectCategory === 'home')
          break
        case 'cabin':
          projects = projectsList.fields.projects!.filter(project => project.fields.projectCategory === 'cabin')
          break
        case 'commercial':
          projects = projectsList.fields.projects!.filter(project => project.fields.projectCategory === 'commercial')
          break
        default:
          projects = projectsList.fields.projects
      }
    }

    const filtered = JSON.parse(JSON.stringify(projectsList))

    filtered.fields.projects = projects

    return filtered
  }, [category, projectsList])

  const categoryCounts = useMemo(() => {
    const counts = {
      all: 0,
      home: 0,
      cabin: 0,
      commercial: 0
    }

    for (const project of projectsList.fields.projects!) {
      counts.all++
      switch (project.fields.projectCategory) {
        case 'home':
          counts.home++
          break
        case 'cabin':
          counts.cabin++
          break
        case 'commercial':
          counts.commercial++
          break
      }
    }

    return counts
  }, [projectsList])

  return (
    <div className="relative">
      {(mode === 'grid' || transitioning) &&
        <div className="absolute lg:fixed lg:p-[132px] top-0 left-0 right-0 width-full" style={{ zIndex: transitioning && nextMode === 'grid' ? 2 : 1 }}>
          <ProjectGridTemplate projectsList={filteredProjectsList} />
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
          <ProjectListTemplate projectsList={filteredProjectsList} categoryCounts={categoryCounts} />
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
