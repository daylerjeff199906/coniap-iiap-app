// MOCK FOR SUPABASE REMOVAL
export const createClient = () => {
  return {
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: { message: 'Supabase removed' } }),
          range: () => ({ data: [], error: null, count: 0 }),
          order: () => ({ data: [], error: null, count: 0 }),
        }),
        ilike: () => ({
          order: () => ({ data: [], error: null }),
        }),
        order: () => ({ data: [], error: null }),
      }),
      insert: () => ({
        select: () => ({
          single: async () => ({ data: null, error: { message: 'Supabase removed' } }),
        }),
      }),
      update: () => ({
        eq: () => ({
          select: () => ({
            single: async () => ({ data: null, error: { message: 'Supabase removed' } }),
          }),
        }),
      }),
      delete: () => ({
        eq: async () => ({ error: { message: 'Supabase removed' } }),
      }),
    }),
    auth: {
      signUp: async () => ({ data: null, error: { message: 'Supabase removed' } }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase removed' } }),
      signOut: async () => ({ error: null }),
    }
  } as any
}
