import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SidebarPrimitive
} from "~/components/ui/sidebar";

const chatGroups = [
  {
    label: "Recent Chats",
    chats: [
      { id: "1", name: "React Basics" },
      { id: "2", name: "AI Ethics" },
      { id: "3", name: "Climate Change" },
    ],
  },
  {
    label: "Saved Chats",
    chats: [
      { id: "4", name: "JavaScript Tips" },
      { id: "5", name: "Machine Learning Intro" },
    ],
  },
];

export const ChatSidebar = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <SidebarPrimitive>
      <SidebarHeader>
        <Button className="w-full justify-start" variant="ghost">
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {chatGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.chats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveChat(chat.id)}
                      isActive={activeChat === chat.id}
                    >
                      {chat.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Button variant="ghost" className="w-full justify-start">
          Settings
        </Button>
      </SidebarFooter>
    </SidebarPrimitive>
  );
};
