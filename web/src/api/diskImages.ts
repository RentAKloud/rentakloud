import { HttpService } from "../services/HttpService";
import { DiskImage } from "../types/diskImage";

class DiskImagesApi {
  static async all(): Promise<DiskImage[]> {
    return await HttpService.get("/disk-images")
  }

  static async one(id: number): Promise<DiskImage> {
    return await HttpService.get(`/disk-images/${id}`)
  }

  static async delete(id: number) {
    return await HttpService.delete(`/disk-images/${id}`)
  }
}

export default DiskImagesApi