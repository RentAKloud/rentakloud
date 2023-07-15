import { HttpService } from "../services/HttpService";
import { DiskImage } from "../types/diskImage";

class DiskImagesApi {
  static async all(query?: URLSearchParams): Promise<DiskImage[]> {
    return await HttpService.get('/disk-images', query)
  }

  static async one(id: number): Promise<DiskImage> {
    return await HttpService.get(`/disk-images/${id}`)
  }

  static async delete(id: number) {
    return await HttpService.delete(`/disk-images/${id}`)
  }
}

export default DiskImagesApi