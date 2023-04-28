import { Component, createSignal, onCleanup } from "solid-js";

const Loader: Component = () => {
  const [progress, setProgress] = createSignal(0)

  let prevTime: number | null = null
  function animateProgress(time: number) {
    if (prevTime === undefined) return

    if (prevTime != null) {
      const delta = time - prevTime
      setProgress((progress() + 0.05 * delta) % 101)
    }

    prevTime = time
    requestAnimationFrame(animateProgress)
  }
  const idx = requestAnimationFrame(animateProgress)

  onCleanup(() => {
    cancelAnimationFrame(idx)
  })

  return (
    <div class="radial-progress text-5xl" style={`--value:${progress()}; --size:12rem; --thickness: 2px;`}>&#9729;</div>
  )
}

export default Loader