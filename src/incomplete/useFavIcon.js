import { useState, useEffect } from 'react'

/**
 * modify the favicon in the public/index.html 
 *  <link id="dynamic-favicon" rel="icon" href="%PUBLIC_URL%/favicon.ico" />
 */

const changeFavicon = src => {
  const head = document.head || document.getElementsByTagName('head')[0]
  const link = document.createElement('link')
  const oldLink = document.getElementById('dynamic-favicon')
  link.id = 'dynamic-favicon'
  link.rel = 'icon'
  link.href = src
  if (oldLink) {
    head.removeChild(oldLink)
  }
  head.appendChild(link)
}

const useFavIcon = iconURL => {
  const [favIcon, setFavIcon] = useState(iconURL)

  useEffect(() => {
    changeFavicon(favIcon)
  }, [favIcon])

  return { favIcon, setFavIcon }
}

export default useFavIcon
