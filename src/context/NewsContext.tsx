import React, { createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';
import type { News } from '../types/index';

const NewsContext = createContext<{
  getNews: () => Promise<News[]>;
  createNews: (news: Omit<News, 'id' | 'created_at'>) => Promise<void>;
}>({
  getNews: async () => [],
  createNews: async () => {},
});

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const getNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  };

  const createNews = async (news: Omit<News, 'id' | 'created_at'>) => {
    const { error } = await supabase
      .from('news')
      .insert([news]);
    
    if (error) throw error;
  };

  return (
    <NewsContext.Provider value={{ getNews, createNews }}>
      {children}
    </NewsContext.Provider>
  );
}

export const useNews = () => useContext(NewsContext); 