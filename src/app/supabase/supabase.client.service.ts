import {Injectable} from "@angular/core";
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SupabaseClientService {

  private readonly client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabase.url, environment.supabase.key);
  }

  getClient(): SupabaseClient {
    if (this.client == undefined) {
      throw "unable-to-create-supabase-client";
    }
    return this.client;
  }
}
