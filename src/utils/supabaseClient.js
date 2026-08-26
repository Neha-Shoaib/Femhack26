import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export const RESUMES_TABLE = 'resumes';


export const resumeOperations = {

  async createResume(userId, resumeData) {
    const { data, error } = await supabase
      .from(RESUMES_TABLE)
      .insert({
        user_id: userId,
        title: resumeData.title || 'Untitled Resume',
        personal_info: resumeData.personalInfo,
        education: resumeData.education,
        skills: resumeData.skills,
        experience: resumeData.experience,
        projects: resumeData.projects,
        languages: resumeData.languages,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },


  async getResumes(userId) {
    const { data, error } = await supabase
      .from(RESUMES_TABLE)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },


  async getResume(resumeId) {
    const { data, error } = await supabase
      .from(RESUMES_TABLE)
      .select('*')
      .eq('id', resumeId)
      .single();
    
    if (error) throw error;
    return data;
  },

  
  async updateResume(resumeId, resumeData) {
    const { data, error } = await supabase
      .from(RESUMES_TABLE)
      .update({
        title: resumeData.title || 'Untitled Resume',
        personal_info: resumeData.personalInfo,
        education: resumeData.education,
        skills: resumeData.skills,
        experience: resumeData.experience,
        projects: resumeData.projects,
        languages: resumeData.languages,
        updated_at: new Date().toISOString(),
      })
      .eq('id', resumeId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },


  async deleteResume(resumeId) {
    const { error } = await supabase
      .from(RESUMES_TABLE)
      .delete()
      .eq('id', resumeId);
    
    if (error) throw error;
    return true;
  },
};

export default supabase;
