import { Component, For, createSignal, onCleanup } from "solid-js"

const CloudsAnimation: Component = () => {
  const [clouds, setClouds] = createSignal([...Array(20).keys()].map((c) => {
    const y = Math.random() * (window.screen.height - 100)
    const x = Math.random() * window.innerWidth
    const speed = Math.random() * 2.5 + 1
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
      const max = c.x + 200
      if (c.dir === 1 && c.left >= max) {
        c.dir = -1
      } else if (c.dir === -1 && c.left < c.x) {
        c.dir = 1
      }

      return {
        ...c,
        left: c.left + c.speed * c.dir,
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
    <div class="absolute w-full h-full flex flex-col justify-between opacity-70">
      <For each={clouds()}>
        {(c) => {
          return (
            <div class="absolute" style={{
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