import { useNavigate } from "@solidjs/router";
import { Accessor, Component, For } from "solid-js";

type PricingCardProps = {
  planName: string,
  ppm: number,
  showYearly: Accessor<boolean>,
  points: string[],
  excludedPoints?: string[],
  submitHandler?: () => void,
  config?: string
}

const PricingCard: Component<PricingCardProps> = (props) => {
  const { planName, ppm, showYearly, points, excludedPoints, submitHandler } = props

  const navigate = useNavigate()
  function defaultSubmitAction() {
    navigate(`/dashboard/instances/new?config=${props.config || ''}`)
  }

  return (
    <div class="w-full max-w-sm p-4 bg-base-100 border border-primary rounded-lg shadow sm:p-8">
      <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{planName}</h5>
      <div class="flex items-baseline text-gray-900 dark:text-white">
        <span class="text-3xl font-semibold">$</span>
        <span class="text-5xl font-extrabold tracking-tight">{showYearly() ? ppm * 12 : ppm}</span>
        <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/{showYearly() ? "year" : "month"}</span>
      </div>
      {/* <!-- List --> */}
      <ul role="list" class="space-y-5 my-7">
        {
          points.map(point => (
            <li class="flex space-x-3">
              {/* <!-- Icon --> */}
              <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{point}</span>
            </li>
          ))
        }
        <For each={excludedPoints}>
          {(point) =>
            <li class="flex space-x-3 line-through decoration-gray-500">
              <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span class="text-base font-normal leading-tight text-gray-500">{point}</span>
            </li>
          }
        </For>
      </ul>
      <button
        type="button"
        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        onclick={submitHandler || defaultSubmitAction}>
        Choose plan
      </button>
    </div>
  )
}

export default PricingCard