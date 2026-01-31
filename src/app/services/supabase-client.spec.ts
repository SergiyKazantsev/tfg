import { TestBed } from '@angular/core/testing';

import { SupabaseClientProvider } from './supabase-client-provider.service';

describe('SupabaseClient', () => {
  let service: SupabaseClientProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseClientProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
