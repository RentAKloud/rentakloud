import { HttpService } from "../services/HttpService";
import { Paginated } from "../types/common";
import { DiskImage } from "../types/diskImage";

class DiskImagesApi {
  static async all(query?: URLSearchParams): Promise<Paginated<DiskImage>> {
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