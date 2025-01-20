import { Client, Databases, ID, Query,Storage } from "appwrite";
import conf from "../conf/conf";

export class Services {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setProject(conf.project_id)// Your Appwrite Project ID
    .setEndpoint(conf.endpoint)
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getBlog(blog_id) {
    try {
      return await this.database.getDocument(
        conf.db_id,
        conf.blogs_collection_id,
        blog_id
      );
    } catch (error) {
      console.error("Error getting blog:", error);
      throw error;
    }
  }
  async getBlogs(queries = [Query.equal("published", true)]) {
    try {
      return await this.database.listDocuments(
        conf.db_id,
        conf.blogs_collection_id,
        queries
      );
    } catch (error) {
      console.error("Error getting blogs:", error);
      throw error;
    }
  }
  async createBlog({
    title,
    content,
    slug,
    owner_id,
    published = true,
    author = "Anonymous",
    tags = [],
    featuredImage = null,
  }) {
    try {
      
      if(!featuredImage){
        featuredImage = await this.uploadFile(featuredImage);
      }
      

      const createdBlog = await this.database.createDocument(
        conf.db_id,
        conf.blogs_collection_id,
        ID.unique(),
        {
          title,
          content,
          published,
          author,
          tags,
          slug,
          featuredImage,
          owner_id
        }
      );
      if(createdBlog){
        return createdBlog;
      }
      return await this.deleteFile(featuredImage);
       

    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  }

  async updateBlog(blog_id, { title, content, published, author, tags,featuredImage,slug }) {
    try {
      return await this.database.updateDocument(
        conf.db_id,
        conf.blogs_collection_id,
        blog_id,
        {
          title,
          content,
          published,
          author,
          tags,
          slug,
          featuredImage
        }
      );
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  }

  async deleteBlog(blog_id) {
    try {
      const featuredImageId = await this.getBlog(blog_id);
      
      await this.database.deleteDocument(
        conf.db_id,
        conf.blogs_collection_id,
        blog_id
      );
      await this.deleteFile(featuredImageId);
      return true;
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.bucket_id, ID.unique(), file);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async deleteFile(file_id) {
    try {
      await this.bucket.deleteFile(conf.bucket_id, file_id);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  async getBlogFilePreview(file_id) {
    try {
      const previewImg = await this.bucket.getFilePreview(conf.bucket_id, file_id);
      return previewImg;
      // return await this.bucket.getFilePreview(conf.bucket_id, file_id).href;
    } catch (error) {
      console.error("Error getting file preview:", error);
      throw error;
    }
    }
    async getBlogFile(file_id){
      try {
        const Img = await this.bucket.getFile(conf.bucket_id, file_id);
        console.log(Img);
        
      
        // console.log(previewImg.href);
        
        return Img;
        // return await this.bucket.getFilePreview(conf.bucket_id, file_id).href;
      } catch (error) {
        console.error("Error getting file preview:", error);
        throw error;
      }
    }
    
}

export default new Services();
