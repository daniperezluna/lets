import {Injectable} from "@angular/core";
import {SupabaseClientService} from "./supabase.client.service";
import {enrichPostWithCreator, Post, PostDTO, Profile} from "./supabase.types";
import {ProfileService} from "./supabase.profile.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private supabase: SupabaseClientService,
    private profileService: ProfileService,
  ) {
  }

  createPost(post: PostDTO) {
    this.supabase.getClient()
      .from('post')
      .insert([post])
      .then(resp => {
        if (resp.error) {
          console.log(resp.error);
        }
      });
  }

  async getPost(post_id: number): Promise<PostDTO> {
    const resp = await this.supabase.getClient().from('post').select('*').eq('id', post_id);
    if (resp.error) {
      throw  `Error retrieving post ${JSON.stringify(resp.error)}`
    }
    if (!resp.data || resp.data.length < 1) {
      throw `Post not found ${post_id}`
    }
    return resp.data[0] as PostDTO;
  }

  async getEnrichedPost(post_id: number): Promise<Post> {
    const dto = await this.getPost(post_id);
    const profile = await this.profileService.getProfile(dto.creator_id);
    return enrichPostWithCreator(dto, profile);
  }

  async getPosts(): Promise<PostDTO[]> {
    const resp = await this.supabase.getClient().from('post')
      .select('*')
      .filter('due_to', 'gt', new Date().toISOString())
      .order('inserted_at', {ascending: true});

    if (resp.error) {
      throw `Could not retrieve posts for ${JSON.stringify(resp.error)}`;
    }

    resp.data = resp.data || [];
    return resp.data as PostDTO[];
  }

  async getPostFromUser(user_id: string): Promise<PostDTO[]> {
    const resp = await this.supabase.getClient().from('post')
      .select('*')
      .eq('creator_id', user_id);

    if (resp.error) {
      throw  `Error retrieving post from user ${user_id}: ${JSON.stringify(resp.error)}`
    }
    if (!resp.data) {
      return [];
    }
    return resp.data;
  }

  async unlike(user_id: string, post_id: number): Promise<boolean> {
    try {
      await this.supabase.getClient().from('user_like_post')
        .delete()
        .match({user_id, post_id})
      return true;
    } catch (error) {
      alert(`${JSON.stringify(error)}`);
    }
    return false;
  }

  async like(user_id: string, post_id: number): Promise<boolean> {
    try {
      await this.supabase.getClient().from('user_like_post').insert([{post_id, user_id}])
      return true;
    } catch (error) {
      if (error.status === '409') {
        console.log(`User ${user_id} already likes ${post_id}`);
        return true;
      }
      console.log(JSON.stringify(error));
      return false;
    }
  }

  async likedPostsFrom(user_id: string): Promise<PostDTO[]> {

    let response = await this.supabase.getClient().from('user_like_post')
      .select('post_id')
      .eq('user_id', user_id);
    if (response.error) {
      throw `Error retrieving user_like_post: ${JSON.stringify(response.error)}`;
    }

    const post_ids = response.data.map(post => post.post_id) as number[];
    response = await this.supabase.getClient().from('post')
      .select('*')
      .in('id', post_ids)
    if (response.error) {
      throw `Error fetching posts liked by ${user_id}: ${JSON.stringify(response.error)}`
    }

    return response.data as PostDTO[];
  }

  async joinedPostsFrom(user_id: string): Promise<PostDTO[]> {

    let response = await this.supabase.getClient().from('user_join_event')
      .select('post_id')
      .eq('user_id', user_id);
    if (response.error) {
      throw `Error retrieving user_join_event: ${JSON.stringify(response.error)}`;
    }

    const post_ids = response.data.map(post => post.post_id) as number[];
    response = await this.supabase.getClient().from('post')
      .select('*')
      .in('id', post_ids)
    if (response.error) {
      throw `Error fetching posts liked by ${user_id}: ${JSON.stringify(response.error)}`
    }

    return response.data as PostDTO[];
  }

  async joinEvent(user_id: string, post_id: number): Promise<boolean> {
    try {
      await this.supabase.getClient().from('user_join_event').insert([{post_id, user_id}])
      return true;
    } catch (error) {
      if (error.status === '409') {
        console.log(`User ${user_id} already joined ${post_id}`);
        return true;
      }
      console.log(JSON.stringify(error));
      return false;
    }
  }

  async leaveEvent(user_id: string, post_id: number): Promise<boolean> {
    try {
      await this.supabase.getClient().from('user_join_event')
        .delete()
        .match({user_id, post_id})
      return true;
    } catch (error) {
      alert(`${JSON.stringify(error)}`);
    }
    return false;
  }

  async joinersFromEvent(post_id: number): Promise<Profile[]> {
    let resp = await this.supabase.getClient().from('user_join_event')
      .select('*')
      .eq('post_id', post_id);
    if (resp.error) {
      throw `Error retrieving joiners from event: ${JSON.stringify(resp.error)}`;
    }

    if (!resp.data || resp.data.length < 1) {
      return [];
    }

    const user_ids = resp.data.map(entry => entry.user_id);

    resp = await this.supabase.getClient().from('user_profile')
      .select('*')
      .in('user_id', user_ids)
    if (resp.error) {
      console.log('Could not retrieve profiles from event', JSON.stringify(resp.error));
      return [];
    }

    if (!resp.data || resp.data.length < 1) {
      return [];
    }
    return resp.data as Profile[];
  }
}
