import { createClient } from '@supabase/supabase-js';
import { FinancialData } from '../types';

// Configuração do Supabase
// Você precisará criar uma conta em https://supabase.com e obter essas credenciais
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funções para gerenciar dados financeiros
export const saveFinancialData = async (data: FinancialData, userId: string) => {
  try {
    const { error } = await supabase
      .from('financial_data')
      .upsert({
        user_id: userId,
        data: data,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return { success: false, error };
  }
};

export const loadFinancialData = async (userId: string): Promise<FinancialData | null> => {
  try {
    const { data, error } = await supabase
      .from('financial_data')
      .select('data')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.data || null;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return null;
  }
};

export const deleteFinancialData = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('financial_data')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar dados:', error);
    return { success: false, error };
  }
};

// Funções de autenticação
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
