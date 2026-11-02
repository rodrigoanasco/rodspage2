import { useEffect, useState } from 'react'
import { mainNavigation, policyNavigation } from '../data/navigation'

export const legalRoutes = policyNavigation.map(({ id }) => id)
const availableRoutes = [...mainNavigation.map(({ id }) => id), ...legalRoutes]

function readRoute() {
  const path = window.location.pathname.replace(/\/$/, '').slice(1)
  return availableRoutes.includes(path) ? path : 'home'
}

function scrollToPageTop(behavior = 'auto') {
  window.scrollTo({ top: 0, left: 0, behavior })
}

export default function usePortfolioNavigation() {
  const [route, setRoute] = useState(readRoute)
  const [pendingHash, setPendingHash] = useState(() =>
    window.location.hash ? { hash: window.location.hash, behavior: 'auto' } : null,
  )

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return undefined
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useEffect(() => {
    const onPopState = () => {
      const nextRoute = readRoute()
      if (nextRoute !== 'home') scrollToPageTop()
      setRoute(nextRoute)
      setPendingHash({ hash: window.location.hash, behavior: 'auto' })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (route !== 'home' || pendingHash === null) return
    if (!pendingHash.hash) {
      scrollToPageTop(pendingHash.behavior ?? 'smooth')
      return
    }
    window.requestAnimationFrame(() => {
      const target = document.querySelector(pendingHash.hash)
      if (!target) return
      const behavior = pendingHash.behavior ?? 'smooth'
      if (behavior === 'auto') {
        const previous = document.documentElement.style.scrollBehavior
        document.documentElement.style.scrollBehavior = 'auto'
        target.scrollIntoView()
        document.documentElement.style.scrollBehavior = previous
        return
      }
      target.scrollIntoView({ behavior })
    })
  }, [pendingHash, route])

  const navigateHome =
    (hash = '') =>
    (event) => {
      event.preventDefault()
      const nextPath = hash ? `/${hash}` : '/'
      if (window.location.pathname !== '/' || window.location.hash !== hash) {
        window.history.pushState({}, '', nextPath)
      }
      if (!hash) scrollToPageTop()
      setRoute('home')
      setPendingHash({ hash, behavior: 'smooth' })
    }

  const navigatePage = (nextRoute) => (event) => {
    event.preventDefault()
    const nextPath = `/${nextRoute}`
    if (
      window.location.pathname !== nextPath ||
      (nextRoute === 'projects' && window.location.hash)
    ) {
      window.history.pushState({}, '', nextPath)
    }
    scrollToPageTop()
    setRoute(nextRoute)
    setPendingHash(null)
  }

  const navigateProjectDetail = (hash) => (event) => {
    event.preventDefault()
    window.history.pushState({}, '', `/projects#${hash}`)
    scrollToPageTop()
    setRoute('projects')
    setPendingHash(null)
  }

  return {
    route,
    navigation: {
      home: navigateHome(),
      about: navigatePage('about'),
      projects: navigatePage('projects'),
      blog: navigatePage('blog'),
      contact: navigatePage('contact'),
    },
    navigateProjectDetail,
  }
}
