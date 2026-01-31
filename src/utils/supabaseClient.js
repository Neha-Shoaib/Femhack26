import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table name
export const RESUMES_TABLE = 'resumes';

// Helper functions for resume operations
export const resumeOperations = {
  // Create a new resume
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

  // Get all resumes for a user
  async getResumes(userId) {
    const { data, error } = await supabase
      .from(RESUMES_TABLE)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get a single resume by ID
  async getResume(resumeId) {
    const { data, error } = await supabase
      .from(RESUMES_TABLE)
      .select('*')
      .eq('id', resumeId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update a resume
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

  // Delete a resume
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
