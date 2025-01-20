const conf = {
    project_id : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    db_id: import.meta.env.VITE_APPWRITE_DB_ID,
    blogs_collection_id : import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID,
    likes_collection_id : import.meta.env.VITE_APPWRITE_LIKES_COLLECTION_ID,
    bucket_id : import.meta.env.VITE_APPWRITE_BUCKET_ID,
    endpoint : import.meta.env.VITE_APPWRITE_ENDPOINT,
    tinyMCE:import.meta.env.VITE_TINY_MCE_API_KEY,
}

export default conf;