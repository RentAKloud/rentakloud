import { ApiResponse, HttpService } from "~/services/HttpService";

type ContactFormReq = {
  name: string
  email: string
  subject: string
  message: string
}

class PublicApi {
  static async contactForm(data: ContactFormReq): ApiResponse<any> {
    return await HttpService.post("/public/contact-form", data)
  }
}

export default PublicApi