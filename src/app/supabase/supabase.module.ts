import { NgModule } from "@angular/core";
import {SupabaseClientService} from "./supabase.client.service";
import {AuthService} from "./auth.service";
import {ProfileService} from "./supabase.profile.service";
import {SupabaseAssetsService} from "./supabase.assets.service";

@NgModule({
  providers: [
    SupabaseClientService,
    AuthService,
    ProfileService,
    SupabaseAssetsService
  ]
})
export class SupabaseModule { }
