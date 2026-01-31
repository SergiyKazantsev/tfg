import {inject, Injectable, signal} from '@angular/core';
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js'
import {SupabaseClientProvider} from "./supabase-client-provider.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabaseClientProvider = inject(SupabaseClientProvider);
  private supabase: SupabaseClient;
  public currentSession: Session | null = null;
  public loggedIn = signal(false);

  constructor() {
    this.supabase = this.supabaseClientProvider.supabase;

    // Initialize session immediately
    this.supabase.auth.getSession().then(({ data }) => {
      this.currentSession = data.session;
    });

    // Keep it updated automatically
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') this.loggedIn.set(true);
      else if (event === 'SIGNED_OUT') {
        this.loggedIn.set(false);
        // clear local and session storage
        [
          window.localStorage, window.sessionStorage,
        ].forEach((storage) => {
          Object.entries(storage)
            .forEach(([key]) => {
              storage.removeItem(key)
            })
        })
      }
    });
  }

  signIn(email: string, password:string) {
    return this.supabase.auth.signInWithPassword({ email, password })
  }

  async signOut() {
    this.loggedIn.set(false);
    await this.supabase.auth.signOut()
  }

  get user() {
    return this.supabase.auth.getUser().then(({ data }) => data?.user)
  }
  get session() {
    return this.supabase.auth.getSession().then(({ data }) => data?.session)
  }
}
