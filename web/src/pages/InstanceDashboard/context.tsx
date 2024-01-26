import { Component, JSXElement, Resource, createContext, createResource, useContext } from "solid-js";
import { useParams, useSearchParams } from "@solidjs/router";
import { authStore } from "~/stores/auth";
import ProductsApi from "~/api/products";
import { Instance } from "~/types/product";

type InstanceContextProps = {
  instance: Resource<Instance|undefined>
}

const defaultInstance: InstanceContextProps = {
  // @ts-ignore
  instance: {}
}

const InstanceContext = createContext<InstanceContextProps>(defaultInstance)

export const useInstanceContext = () => {
  return useContext(InstanceContext)
}

export const InstanceProvider: Component<{ children: JSXElement }> = (props) => {
  const { user } = authStore
  const [params, setParams] = useSearchParams()
  const { id } = useParams()

  const [instance] = createResource(async () => {
    const { result, error } = await ProductsApi.instance(id)
    if (result) {
      return result
    }
    if (error) throw error
  })

  return (
    <InstanceContext.Provider value={{
      instance
    }}>
      {props.children}
    </InstanceContext.Provider>
  )
}