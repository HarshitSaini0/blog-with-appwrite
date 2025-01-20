import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";
export class LikeServices {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setProject(conf.project_id) // Your Appwrite Project ID
      .setEndpoint(conf.endpoint);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async currentUserLikeState(blog_id, user_id) {
    try {
      const result = await this.database.listDocuments(
        conf.db_id,
        conf.likes_collection_id,
        [Query.equal("user_id", user_id), Query.equal("blog_id", blog_id)]
      );
      return result.documents.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async toggleLike(blog_id, user_id) {
    try {
      if (!user_id && !blog_id) return false;
      const blogsLiked = await this.database.listDocuments(
        conf.db_id,
        conf.likes_collection_id,
        [Query.equal("user_id", user_id), Query.equal("blog_id", blog_id)]
      );
      const n = blogsLiked.documents.length;
      if (n <= 0) {
        return this.createLike(blog_id, user_id);
      }

      return this.deleteLike(blog_id, user_id);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async getLikeCount(blog_id) {
    try {
      const result = await this.database.listDocuments(
        conf.db_id,
        conf.likes_collection_id,
        [Query.equal("blog_id", blog_id)]
      );
      return result.length;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }
  async deleteLike(blog_id, user_id) {
    try {
      const blogsLiked = await this.database.listDocuments(
        conf.db_id,
        conf.likes_collection_id,
        [Query.equal("user_id", user_id), Query.equal("blog_id", blog_id)]
      );
      const n = blogsLiked.documents.length;

      if (n <= 0) return false;

      blogsLiked.documents.forEach(async (document) => {
        await this.database.deleteDocument(
          conf.db_id,
          conf.likes_collection_id,
          document.$id
        );
      });

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async createLike(blog_id, user_id) {
    try {
      const blogsLiked = await this.database.listDocuments(
        conf.db_id,
        conf.likes_collection_id,
        [Query.equal("user_id", user_id), Query.equal("blog_id", blog_id)]
      );
      const n = blogsLiked.documents.length;

      if (n > 0) return true;

      await this.database.createDocument(
        conf.db_id,
        conf.likes_collection_id,
        ID.unique(),
        {
          user_id: user_id,
          blog_id: blog_id,
        }
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

const likeServices = new LikeServices();
export default likeServices;
// export { AuthServices };
