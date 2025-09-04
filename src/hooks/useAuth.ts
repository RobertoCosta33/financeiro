import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, signIn, signUp, signOut } from '../services/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se estamos no servidor ou se o Supabase está configurado
    if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co') {
      setLoading(false);
      return;
    }

    // Verificar usuário atual
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
        setLoading(false);
      }
    };

    getCurrentUser();

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await signIn(email, password);
    setLoading(false);
    return { data, error };
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await signUp(email, password);
    setLoading(false);
    return { data, error };
  };

  const logout = async () => {
    setLoading(true);
    const { error } = await signOut();
    setLoading(false);
    return { error };
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};
