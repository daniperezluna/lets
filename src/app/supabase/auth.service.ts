import {Injectable} from "@angular/core";
import {SupabaseClientService} from "./supabase.client.service";
import {AuthChangeEvent, Session, User} from "@supabase/supabase-js";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  session$: ReplaySubject<Session>
  signedUp$: ReplaySubject<User>
  user: User | null | undefined;
  session: Session | null | undefined;

  constructor(private supabase: SupabaseClientService) {
    this.session$ = new ReplaySubject<Session>(1);
    this.signedUp$ = new ReplaySubject<User>(1);
    this.supabase.getClient().auth.onAuthStateChange(this.emitStatusChange.bind(this));
  }

  emitStatusChange(event: AuthChangeEvent, session: Session | null) {
    switch (event) {
      case "SIGNED_IN":
        if (session) {
          this.session$.next(session);
        }
        break;
      case "SIGNED_OUT":
        this.session$.next();
        break;
      default:
        console.log("Event", event, "ignored");
        break;
    }
  }

  isLoggedIn(): boolean {
    return !!this.supabase.getClient().auth.session();
  }

  async logIn(email: string, password: string): Promise<Session | null> {
    const client = this.supabase.getClient();
    const {user, session, error} = await client.auth.signIn({
      email,
      password
    });

    if (error) {
      throw error;
    }

    this.user = user;
    return session;
  }

  async signIn(email: string, password: string): Promise<Session | null> {
    const client = this.supabase.getClient();
    const {user, session, error} = await client.auth.signUp({email, password});

    if (error) {
      throw error;
    }

    if (session) {
      this.session = session;
    }

    if (user) {
      this.user = user;
      this.signedUp$.next(user);
    }

    return session;
  }

  async signOut() {
    await this.supabase.getClient().auth.signOut();
  }
}
