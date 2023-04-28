import { Component } from "solid-js";

export const DateTime: Component<{
  value: string;
}> = (props) => {
  const { value } = props

  return (
    <>
      {formatDatetime(value).toDateString()}
    </>
  )
}

function formatDatetime(datetime: string) {
  return new Date(datetime)
}