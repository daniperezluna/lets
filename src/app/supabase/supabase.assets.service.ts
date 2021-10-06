import {Injectable} from "@angular/core";
import {SupabaseClientService} from "./supabase.client.service";
import {uuid} from "@supabase/supabase-js/dist/module/lib/helpers";
import {FileOptions} from "@supabase/storage-js";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SupabaseAssetsService {

  constructor(
    private readonly supabase: SupabaseClientService
  ) {
  }

  async retrieve(path: string): Promise<string> {
    const resp = await this.supabase.getClient().storage.from('public-assets').getPublicUrl(path);
    if (resp.error) {
      throw `Error retrieving asset ${resp.error.name} => ${resp.error.message}`;
    }
    if (!resp.publicURL) {
      throw `Asset not found ${path}`;
    }
    return this.buildStorageUriFrom(resp.publicURL);
  }

  private buildStorageUriFrom(path: string): string {
    return `${environment.supabase.storage.url}${path}`;
  }

  async store(file: File): Promise<string> {
    const path = `public/${uuid()}.${file.type.split('/')[1]}`;

    const response = await this.supabase.getClient()
      .storage
      .from('public-assets')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      } as FileOptions);

    if (response.error) {
      throw `Error uploading file ${response.error.name} => ${response.error.message}`
    }

    return this.buildStorageUriFrom(response.data?.Key || path);
  }

}
