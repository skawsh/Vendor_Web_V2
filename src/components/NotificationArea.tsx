
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Check, X, Info, MessageSquare, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'order' | 'message' | 'reminder';
}

export const NotificationArea = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #2458 has been received from Rahul Sharma',
      time: '10 minutes ago',
      read: false,
      type: 'order'
    },
    {
      id: '2',
      title: 'Order Status Updated',
      message: 'Order #2456 has been completed and is ready for delivery',
      time: '1 hour ago',
      read: false,
      type: 'order'
    },
    {
      id: '3',
      title: 'New Message',
      message: 'You have a new message from Priya regarding her order',
      time: '3 hours ago',
      read: true,
      type: 'message'
    },
    {
      id: '4',
      title: 'Reminder',
      message: 'Don\'t forget to process pending orders for today',
      time: '5 hours ago',
      read: true,
      type: 'reminder'
    },
    {
      id: '5',
      title: 'System Update',
      message: 'The system will undergo maintenance tonight from 2 AM to 4 AM',
      time: '1 day ago',
      read: true,
      type: 'info'
    }
  ]);

  const getIconByType = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast.success('Notification marked as read');
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success('Notification dismissed');
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success('All notifications marked as read');
  };

  const dismissAllNotifications = () => {
    setNotifications([]);
    toast.success('All notifications dismissed');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="shadow-sm border">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="default" className="ml-1 px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs"
                onClick={markAllAsRead}
              >
                <Check className="mr-1 h-3 w-3" />
                Mark all read
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs"
                onClick={dismissAllNotifications}
              >
                <X className="mr-1 h-3 w-3" />
                Dismiss all
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        {notifications.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-lg border flex gap-3 ${
                  notification.read ? 'bg-white' : 'bg-blue-50 border-blue-100'
                }`}
              >
                <div className="mt-0.5">
                  {getIconByType(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`font-medium text-sm ${!notification.read ? 'text-blue-700' : ''}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {!notification.read && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs p-0 px-2"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="mr-1 h-3 w-3" />
                        Mark as read
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs p-0 px-2 hover:bg-red-50 hover:text-red-600"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <X className="mr-1 h-3 w-3" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationArea;
