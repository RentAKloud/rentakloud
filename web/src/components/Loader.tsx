import { Component, createSignal, onCleanup } from "solid-js";

type LoaderProps = {
  fullScreen?: boolean
}

const Loader: Component<LoaderProps> = (props) => {
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

  const Inner = () => <div class="radial-progress text-5xl" style={`--value:${progress()}; --size:12rem; --thickness: 2px;`}>&#9729;</div>

  if (props.fullScreen) {
    return (
      <div class="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center">
        <Inner />
      </div>
    )
  }

  return (
    <Inner />
  )
}

export default Loader