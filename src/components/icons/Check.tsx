import { Component } from "solid-js"

const CheckIcon: Component<{ success: boolean }> = ({ success }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5}
      stroke="currentColor" class="h-5 inline"
      classList={{ 'text-success': success }}
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>

  )
}

export default CheckIcon