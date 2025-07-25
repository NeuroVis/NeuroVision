import { Posts } from "@/components/posts";

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <Posts />
    </div>
  );
}