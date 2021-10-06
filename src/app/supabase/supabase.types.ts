import {User} from "@supabase/supabase-js";

export type PostType = "EVENT" | "NEWS" | "SURVEY";
export type PostCategory = "EAT" | "MEET" | "PLAY" | "INFORM";

export interface Profile {
  user: User,
  username: string,
  created_at: string
  picture_url: string
}

export function enrichPostWithCreator(dto: PostDTO, creator: Profile) {
  return {
    creator_id: dto.creator_id,
    creatorProfile: creator,
    type: dto.type,
    category: dto.category,
    content: dto.content,
    description: dto.description,
    dueDate: new Date(dto.due_to),
    title: dto.title,
    image_url: dto.image_url,
    id: dto.id
  } as Post;
}

export interface PostDTO {
  creator_id: string,
  title: string,
  description: string,
  image_url: string,
  content?: PostContent,
  category: PostCategory,
  type: PostType,
  due_to: string,
  id: number
}

export interface PostContent {
  id: string,
  content: SurveyQuestion | EventContent;
}

export interface SurveyQuestion {
  key: string,
  title: string
}

export interface SurveyAnswer {
  key: string,
  value: boolean
}

export interface SurveyContent {
  content_id: string
  questions: [SurveyAnswer]
}

export interface EventContent {
  maxParticipants: number,
  location: string,
  price: number
}

export interface Post {
  creatorProfile: Profile,
  creator_id: string,
  title: string,
  description: string,
  image_url: string,
  content: PostContent,
  type: PostType,
  category: PostCategory
  dueDate: Date,
  id: number
}
