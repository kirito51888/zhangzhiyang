export interface Education {
  school: string;
  major: string;
  degree: string;
  college: string;
  period: string;
  gpa: string;
  awards: string[];
}

export interface Internship {
  company: string;
  title: string;
  period: string;
  highlights: string[];
}

export interface SoftwareProject {
  id: string;
  name: string;
  chineseName: string;
  tagline: string;
  tags: string[];
  description: string;
  highlights: string[];
  githubUrl: string;
  vercelUrl: string;
  mockupFeatures: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface BusinessProject {
  title: string;
  role: string;
  period: string;
  highlights: string[];
  award: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
