import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Chat } from "@/types/chat";
import { format } from "date-fns";

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

export function ChatList({ chats, selectedChatId, onSelectChat, onNewChat }: ChatListProps) {
  return (
    <div className="w-64 border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <Button className="w-full" onClick={onNewChat}>
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant={selectedChatId === chat.id ? "secondary" : "ghost"}
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="truncate">
                <div className="font-medium truncate">{chat.title}</div>
                <div className="text-xs text-muted-foreground">
                  {format(new Date(chat.lastModified), 'MMM d, yyyy HH:mm')}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}