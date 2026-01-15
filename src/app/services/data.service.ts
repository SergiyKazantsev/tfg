import {Injectable, signal} from '@angular/core';
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

export interface ItemCompra {
  id: number;
  name: string;
  user_id: string;
  checked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private supabase: SupabaseClient;
  public currentSession: Session | null = null;
  public loggedIn = signal(false);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

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

  public getMessages() {
    return this.supabase.from('items').select('*');
  }

  signIn(email: string, password:string) {
    return this.supabase.auth.signInWithPassword({ email, password })
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  async deleteItem($event: ItemCompra) {
    const { error } = await this.supabase
      .from('items')
      .delete()
      .eq('id', $event.id)
  }

  async checkItem(item: ItemCompra) {
    item.checked = !item.checked;
    // 2. Update Database
    const { data, error } = await this.supabase
      .from('items')
      .update({ checked: item.checked })
      .eq('id', item.id)
      .select();
  }

  async createItem($event: Partial<ItemCompra>) {
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) {
      console.error('User not logged in!');
      return;
    }
    const { data, error } = await this.supabase
      .from('items')
      .insert({
        name: $event.name,
        user_id: user.id
      })
      .select()
      .single();
    if(!error) {
      return data
    }
  }
}
