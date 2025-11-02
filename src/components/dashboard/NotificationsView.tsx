import { useState } from "react";
import { useThemeStyles } from "../ThemeProvider";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/batch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Heart, MessageCircle, UserPlus, Bell, Check } from "lucide-react";
import { motion } from "motion/react";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  user: {
    name: string;
    image: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  postPreview?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Sarah Mitchell",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    content: "liked your post",
    timestamp: "5 minutes ago",
    isRead: false,
    postPreview: "Just launched my new portfolio website! 🎉",
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "Alex Chen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    content: 'commented: "This is amazing! Great work 👏"',
    timestamp: "1 hour ago",
    isRead: false,
    postPreview: "Check out my latest design system",
  },
  {
    id: "3",
    type: "follow",
    user: {
      name: "Maya Patel",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    },
    content: "started following you",
    timestamp: "3 hours ago",
    isRead: true,
  },
  {
    id: "4",
    type: "like",
    user: {
      name: "James Rodriguez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    content: "and 12 others liked your post",
    timestamp: "5 hours ago",
    isRead: true,
    postPreview: "Thoughts on the future of web development",
  },
  {
    id: "5",
    type: "mention",
    user: {
      name: "Emma Wilson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    content: "mentioned you in a comment",
    timestamp: "1 day ago",
    isRead: true,
  },
];

export function NotificationsView() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const styles = useThemeStyles();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "follow":
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case "mention":
        return <Bell className="w-5 h-5 text-purple-500" />;
    }
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => !notification.isRead && markAsRead(notification.id)}
    >
      <Card
        className={`p-4 cursor-pointer transition-colors ${
          !notification.isRead
            ? styles.tw("bg-sky-50 border-l-4 border-l-sky-500", "bg-sky-900/20 border-l-4 border-l-sky-500")
            : ""
        } ${styles.hover.bg}`}
      >
        <div className="flex gap-4">
          <Avatar className="w-12 h-12 border-2 border-sky-500">
            <AvatarImage src={notification.user.image} />
            <AvatarFallback className="bg-sky-500 text-white">
              {notification.user.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-1">
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{notification.user.name}</span>{" "}
                  <span className="text-muted-foreground">
                    {notification.content}
                  </span>
                </p>
                {notification.postPreview && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {notification.postPreview}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {getNotificationIcon(notification.type)}
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-sky-500 rounded-full" />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {notification.timestamp}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="gap-2"
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">
          Stay updated with your community activity
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="w-full lg:w-auto">
          <TabsTrigger value="all" className="flex-1 lg:flex-none">
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex-1 lg:flex-none">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="mentions" className="flex-1 lg:flex-none">
            Mentions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-3">
          {notifications.filter((n) => !n.isRead).length > 0 ? (
            notifications
              .filter((n) => !n.isRead)
              .map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
          ) : (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-lg mb-2">You are all caught up!</h3>
              <p className="text-sm text-muted-foreground">
                No new notifications at the moment.
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="mentions" className="space-y-3">
          {notifications.filter((n) => n.type === "mention").length > 0 ? (
            notifications
              .filter((n) => n.type === "mention")
              .map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
          ) : (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg mb-2">No mentions yet</h3>
              <p className="text-sm text-muted-foreground">
                When someone mentions you, you will see it here.
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
