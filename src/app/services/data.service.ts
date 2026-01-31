import {inject, Injectable, signal} from '@angular/core';
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js'
import { SupabaseClientProvider} from "./supabase-client-provider.service";
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
  supabaseClientProvider = inject(SupabaseClientProvider);

  constructor() {
    this.supabase = this.supabaseClientProvider.supabase;
  }

  public getMessages() {
    return this.supabase.from('items').select('*');
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
