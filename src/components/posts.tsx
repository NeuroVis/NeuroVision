"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PostCard } from "./post-card";
import { CreatePostDialog } from "./create-post-dialog";
import { mockPosts } from "@/lib/mock-data";
import { Post } from "@/types/post";

const POSTS_STORAGE_KEY = 'blog-posts';

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      setPosts(mockPosts);
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(mockPosts));
    }
  }, []);

  useEffect(() => {
    if (posts.length === 0) {
      return;
    }

    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = (newPost: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
    const post: Post = {
      ...newPost,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
    setIsCreateDialogOpen(false);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div>
      <div className="mb-6">
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onUpdate={handleUpdatePost}
            onDelete={handleDeletePost}
          />
        ))}
      </div>

      <CreatePostDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}