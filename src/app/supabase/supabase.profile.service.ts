import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Session, User} from "@supabase/supabase-js";
import {ReplaySubject} from "rxjs";
import {SupabaseClientService} from "./supabase.client.service";
import {Profile} from "./supabase.types";

const anonymous_profile = {
  username: "anonymous",
  picture_url: ""
} as Profile;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile = {} as Profile;
  profile$: ReplaySubject<Profile>;

  constructor(
    private authService: AuthService,
    private supabase: SupabaseClientService) {

    this.profile$ = new ReplaySubject<Profile>(1);
    this.authService.session$.subscribe(this.onSessionChange.bind(this));
    this.authService.signedUp$.subscribe(this.onUserSignUp.bind(this));
  }

  onUserSignUp(user: User) {
    const username = user.email?.split("@")[0];
    this.supabase.getClient()
      .from('user_profile')
      .insert([
        {username: username, user_id: user.id}
      ])
      .then(resp => {
        if (resp.error) {
          console.log(`Profile Service: create user_profile error: ${JSON.stringify(resp.error)}`);
          return;
        }
        this.fetchProfile(user).then(this.setProfile.bind(this));
      })
  }

  onSessionChange(session: Session) {
    if (session) {
      this.fetchProfile(session.user)
        .then(profile => {
          if (profile) {
            this.profile = profile;
            this.profile$.next(profile);
          } else {
            this.profile$.next(anonymous_profile);
          }
        })
        .catch(err => console.log(`profile-service: ${JSON.stringify(err)}`));
    }
  }

  async fetchProfile(user: User | undefined | null) {

    if (!user) {
      return;
    }

    const res = await this.supabase.getClient().from('user_profile')
      .select('user_id,picture_url,username,inserted_at')
      .eq('user_id', user.id)
      .range(0,1);

    if (res.error) {
      throw `Could not retrieve the users profile ${JSON.stringify(res.error)}`
    }
    if (!res.data || res.data.length < 1 || !res.data[0]) {
      throw `Not found ${JSON.stringify(res)}`;
    }

    const profile = res.data[0] as Profile;
    profile.user = user;

    return profile;
  }

  setProfile(profile: Profile | undefined) {
    if (profile) {
      this.profile = profile;
    } else {
      this.profile = anonymous_profile;
    }
    this.profile$.next(this.profile);
  }

  async getProfile(profileId: string): Promise<Profile> {
    const resp = await this.supabase.getClient().from('user_profile')
      .select('username,picture_url')
      .eq('user_id', profileId);

    if (resp.error) {
      throw `Could not find profileId: ${profileId}`
    }

    if (!resp.data || resp.data.length < 1) {
      throw `Not a single profile retrieved ${JSON.stringify(resp)}`
    }
    return resp.data[0] as Profile;
  }

}
