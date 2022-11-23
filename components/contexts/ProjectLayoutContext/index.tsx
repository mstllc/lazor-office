import { useRouter } from 'next/router'
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

export type TProjectLayoutContextLayoutMode = 'grid' | 'list' | 'project'

type TProjectLayoutContextValue = {
  mode: TProjectLayoutContextLayoutMode
  nextMode?: TProjectLayoutContextLayoutMode
  projectSlug?: string
  transitioningOut: boolean
  transitioningIn: boolean
  transitioning: boolean
  setMode: (mode: TProjectLayoutContextLayoutMode, immediate?: boolean) => void
  setProjectSlug: (slug: string) => void
  transitionOutComplete: () => void
  transitionInComplete: () => void
}

const defaultProjectLayoutContextValue: TProjectLayoutContextValue = {
  mode: 'grid',
  transitioningOut: false,
  transitioningIn: false,
  transitioning: false,
  setMode: () => { },
  setProjectSlug: () => { },
  transitionOutComplete: () => { },
  transitionInComplete: () => { }
}

const ProjectLayoutContext = createContext<TProjectLayoutContextValue>(defaultProjectLayoutContextValue)

type TProps = {
  children?: React.ReactNode
}

function ProjectLayoutContextProvider({ children }: TProps) {
  const router = useRouter()
  const params = Object.fromEntries(new URLSearchParams(router.asPath.includes('?') ? router.asPath.split('?').pop() : ''))
  const [mode, setMode] = useState<TProjectLayoutContextLayoutMode>(params.mode === 'list' ? 'list' : 'grid')
  const [nextMode, setNextMode] = useState<TProjectLayoutContextLayoutMode | undefined>()
  const [projectSlug, setProjectSlug] = useState<string | undefined>()
  const [transitioningOut, setTransitioningOut] = useState(false)
  const [transitioningIn, setTransitioningIn] = useState(false)

  const transitioning = transitioningOut || transitioningIn

  const setModeInternal = useCallback((newMode: TProjectLayoutContextLayoutMode, immediate = false) => {
    if (immediate) {
      setMode(newMode)
      return
    }

    if (newMode !== mode && !transitioning) {
      setNextMode(newMode)
      setTransitioningOut(true)
      setTransitioningIn(false)
    }
  }, [mode, transitioning])

  const transitionOutComplete = useCallback(() => {
    if (transitioningOut) {
      setTransitioningOut(false)
      setTransitioningIn(true)
    }
  }, [transitioningOut])

  const transitionInComplete = useCallback(() => {
    if (transitioningIn) {
      setTransitioningOut(false)
      setTransitioningIn(false)
      if (nextMode) {
        setMode(nextMode)
      }
    }
  }, [transitioningIn, nextMode])

  useEffect(() => {
    if (transitioning) {
      disablePageScroll()
    } else {
      enablePageScroll()
    }
  }, [transitioning])

  useEffect(() => {
    if (router.pathname === '/' && mode !== 'project' && router.query.mode !== mode) {
      router.replace({ pathname: '/', query: { ...params, ...router.query, mode } }, undefined, { shallow: true })
    }
  }, [mode, router, params])

  const value = {
    mode,
    nextMode,
    projectSlug,
    transitioningOut,
    transitioningIn,
    transitioning,

    setMode: setModeInternal,
    setProjectSlug,
    transitionOutComplete,
    transitionInComplete
  }

  return (
    <ProjectLayoutContext.Provider value={value}>
      {children}
    </ProjectLayoutContext.Provider>
  )
}

const useProjectLayout = () => useContext(ProjectLayoutContext)

export default ProjectLayoutContextProvider
export { useProjectLayout }
