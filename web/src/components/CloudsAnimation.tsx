import { Component, For, createSignal, onCleanup } from "solid-js"

const CloudsAnimation: Component = () => {
  const sectionHeight = window.screen.height - 150
  const sectionWidth = window.innerWidth
  const numClouds = 20
  const cloudSpacing = sectionHeight / numClouds

  const [clouds, setClouds] = createSignal([...Array(numClouds).keys()].map((c) => {
    const y = c * cloudSpacing
    const x = Math.random() * sectionWidth
    const speed = Math.random() * 1.618 + 1
    return {
      x, y,
      top: y,
      left: x,
      dir: 1,
      speed,
      size: speed * 20
    }
  }))

  function myAnim(dt: number) {
    const newClouds = clouds().map(c => {
      // Alternating direction
      // const maxX = c.x + 250
      // if (c.dir === 1 && c.left >= maxX) {
      //   c.dir = -1
      // } else if (c.dir === -1 && c.left < c.x) {
      //   c.dir = 1
      // }

      return {
        ...c,
        left: (c.left + c.speed * c.dir) % sectionWidth,
        top: c.top + Math.sin(c.left / 50) * 2 * c.dir,
        dir: c.dir
      }
    })
    setClouds(newClouds)

    requestAnimationFrame(myAnim)
  }

  const x = requestAnimationFrame(myAnim)
  onCleanup(() => {
    cancelAnimationFrame(x)
  })

  return (
    <div class="absolute w-full h-full flex flex-col justify-between opacity-50 overflow-hidden pointer-events-none">
      <For each={clouds()}>
        {(c) => {
          return (
            <div class="absolute invert dark:invert-0" style={{
              left: c.left + "px",
              top: c.top + "px",
              "font-size": c.size + "px"
            }}>&#9729;</div>
          )
        }}
      </For>
    </div>
  )
}

export default CloudsAnimation