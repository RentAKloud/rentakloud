import { Accessor, Component, JSXElement, Resource, createContext, createResource, createSignal, useContext } from "solid-js";
import { useParams, useSearchParams } from "@solidjs/router";
import { authStore } from "~/stores/auth";
import { Instance, InstanceAction } from "~/types/instance";
import InstancesApi from "~/api/instances";
import { NotificationService } from "~/services/NotificationService";
import { capitalize } from "~/utils";

type InstanceContextProps = {
  instance: Resource<Instance | undefined>
  inTransit: Accessor<boolean>,
  start: () => void
  stop: () => void
  restart: () => void
}

const defaultInstance: InstanceContextProps = {
  // @ts-ignore
  instance: {},
  inTransit: () => false,
  start: () => { },
  stop: () => { },
  restart: () => { }
}

const InstanceContext = createContext<InstanceContextProps>(defaultInstance)

export const useInstanceContext = () => {
  return useContext(InstanceContext)
}

export const InstanceProvider: Component<{ children: JSXElement }> = (props) => {
  const { user } = authStore
  const [params, setParams] = useSearchParams()
  const [inTransit, setInTransit] = createSignal(false)
  const { id } = useParams()

  const [instance, { refetch }] = createResource(async () => {
    const { result, error } = await InstancesApi.one(id)
    if (result) {
      return result
    }
    if (error) throw error
  })

  async function stop() {
    _action("stop", "Stopped VM")
  }

  async function start() {
    _action("start", "Started VM")
  }

  async function restart() {
    _action("restart", "Restarted VM")
  }

  async function _action(_action: InstanceAction, successMessage: string) {
    setInTransit(true)
    await action(instance.latest!.id, _action, successMessage, refetch)
    setInTransit(false)
  }

  return (
    <InstanceContext.Provider value={{
      instance,
      inTransit,
      start,
      stop,
      restart
    }}>
      {props.children}
    </InstanceContext.Provider>
  )
}

export async function action(id: string, action: InstanceAction, successMessage: string, cb?: Function) {
  NotificationService.info(`${capitalize(action)}ing VM...`)

  const { result, error } = await InstancesApi.action(id, action, {})

  if (error) {
    NotificationService.error(error.message)
  } else if (result) {
    if (result.status) {
      NotificationService.success(successMessage)
      cb && cb()
    }
    else
      NotificationService.error(`Could not ${action} the VM right now`)
  }
}