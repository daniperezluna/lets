import { PostCategory, PostContent, PostType } from "../../supabase/supabase.types";

export class Post {
  constructor(
    public post_id: number,
    public creator_id: string,
    public title: string,
    public image_url: string,
    public description: string,
    public due_to: number,
    public category: PostCategory,
    public type: PostType,
    public content?: PostContent
  ) {}
}
