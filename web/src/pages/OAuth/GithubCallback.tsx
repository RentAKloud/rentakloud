import { useSearchParams } from "@solidjs/router"
import DefaultLayout from "../../layouts/DefaultLayout"

const GithubCallback = () => {
  const [params, setParams] = useSearchParams()

  return (
    <DefaultLayout>
      Code: {params.code}
    </DefaultLayout>
  )
}

export default GithubCallback