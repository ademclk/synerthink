import type P5 from 'p5'

type P5Constructor = typeof P5

declare global {
  interface Window {
    p5?: P5Constructor
  }
}

let p5Promise: Promise<P5Constructor> | null = null

export async function loadP5(): Promise<P5Constructor> {
  if (typeof window === 'undefined') {
    throw new Error('loadP5() must be called in the browser.')
  }

  if (window.p5) return window.p5

  if (!p5Promise) {
    p5Promise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = '/vendor/p5.min.js'
      script.async = true
      script.onload = () => {
        if (!window.p5) {
          reject(new Error('p5 loaded, but window.p5 is undefined.'))
          return
        }
        resolve(window.p5)
      }
      script.onerror = () => reject(new Error('Failed to load p5.'))
      document.head.appendChild(script)
    })
  }

  return p5Promise
}
