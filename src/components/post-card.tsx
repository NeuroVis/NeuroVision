"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { EditPostDialog } from "./edit-post-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface PostCardProps {
  post: Post;
  onUpdate: (post: Post) => void;
  onDelete: (id: string) => void;
}

export function PostCard({ post, onUpdate, onDelete }: PostCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{post.title}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Post</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this post? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(post.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{post.content}</p>
        <div className="mt-4 text-sm text-muted-foreground">
          Created: {new Date(post.createdAt).toLocaleDateString()}
          {post.updatedAt !== post.createdAt &&
            ` • Updated: ${new Date(post.updatedAt).toLocaleDateString()}`}
        </div>
      </CardContent>

      <EditPostDialog
        post={post}
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(updatedPost) => {
          onUpdate({
            ...updatedPost,
            id: post.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          setIsEditDialogOpen(false);
        }}
      />
    </Card>
  );
}