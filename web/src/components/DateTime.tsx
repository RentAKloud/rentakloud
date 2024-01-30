import { Component, Match, Switch } from "solid-js";
import { pluralize } from "~/utils";

export const DateTime: Component<{
  value: string|number
  ago?: boolean
}> = (props) => {

  return (
    <Switch>
      <Match when={props.ago}>
        {ago(formatDatetime(props.value))}
      </Match>
      <Match when={!props.ago}>
        {formatDatetime(props.value).toDateString()}
      </Match>
    </Switch>
  )
}

function formatDatetime(datetime: string|number) {
  return new Date(datetime)
}

function ago(datetime: Date) {
  let exact = Math.round((Date.now() - +datetime) / 1000) // seconds
  if (exact < 60) {
    return `${exact} ${pluralize(exact, 'second')} ago`
  }
  exact = Math.round(exact / 60) // minutes
  if (exact < 60) {
    return `${exact} ${pluralize(exact, 'minute')} ago`
  }
  exact = Math.round(exact / 60) // hours
  if (exact < 24) {
    return `${exact} ${pluralize(exact, 'hour')} ago`
  }
  exact = Math.round(exact / 24) // days
  if (exact < 30) {
    return `${exact} ${pluralize(exact, 'day')} ago`
  }
  // weeks ?
  exact = Math.round(exact / 30) // months
  if (exact < 12) {
    return `${exact} ${pluralize(exact, 'month')} ago`
  }
  exact = Math.round(exact / 12) // years
  return `${exact} ${pluralize(exact, 'year')} ago`
}