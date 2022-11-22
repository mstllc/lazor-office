import { useRouter } from 'next/router'
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

export type TProjectLayoutContextLayoutMode = 'grid' | 'list'

type TProjectLayoutContextValue = {
  mode: TProjectLayoutContextLayoutMode
  nextMode?: TProjectLayoutContextLayoutMode
  transitioningOut: boolean
  transitioningIn: boolean
  transitioning: boolean
  setMode: (mode: TProjectLayoutContextLayoutMode, immediate?: boolean) => void
  transitionOutComplete: () => void
  transitionInComplete: () => void
}

const defaultProjectLayoutContextValue: TProjectLayoutContextValue = {
  mode: 'grid',
  transitioningOut: false,
  transitioningIn: false,
  transitioning: false,
  setMode: () => { },
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
  const [nextMode, setNextMode] = useState<TProjectLayoutContextLayoutMode | undefined>(params.mode === 'list' ? 'list' : 'grid')
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
      nextMode && setMode(nextMode)
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
    if (router.pathname === '/' && router.query.mode !== mode) {
      router.replace({ pathname: '/', query: { ...params, ...router.query, mode } }, undefined, { shallow: true })
    }
  }, [mode, router, params])

  const value = {
    mode,
    nextMode,
    transitioningOut,
    transitioningIn,
    transitioning,

    setMode: setModeInternal,
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
