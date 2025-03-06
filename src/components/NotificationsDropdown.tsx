
import React, { useState } from 'react';
import { Bell, BellOff, Check, Trash2, Info, Calendar, ShoppingBag, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type NotificationType = 'info' | 'warning' | 'success' | 'order';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
}

export const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Order Received',
      message: 'Order #ORD-1011 has been placed',
      time: '10 minutes ago',
      read: false,
      type: 'order'
    },
    {
      id: '2',
      title: 'Studio Status',
      message: 'Your studio is now active and accepting orders',
      time: '1 hour ago',
      read: false,
      type: 'success'
    },
    {
      id: '3',
      title: 'Payment Received',
      message: 'Payment of ₹450 received for order #ORD-1004',
      time: '3 hours ago',
      read: true,
      type: 'success'
    },
    {
      id: '4',
      title: 'Order Ready for Collection',
      message: 'Order #ORD-1003 is ready for collection',
      time: '1 day ago',
      read: true,
      type: 'info'
    },
    {
      id: '5',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on 10th March, 2-4 AM',
      time: '2 days ago',
      read: true,
      type: 'warning'
    }
  ]);

  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter(notification => !notification.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({
        ...notification,
        read: true
      }))
    );
    toast.success('All notifications marked as read');
  };

  const handleClearAll = () => {
    setNotifications([]);
    setOpen(false);
    toast.success('All notifications cleared');
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-purple-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="iconButton" 
          className="relative mr-2 text-gray-700 hover:text-black"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0" align="end">
        <div className="flex items-center justify-between p-3 bg-gray-50">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="h-8 px-2 text-xs"
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearAll}
              className="h-8 px-2 text-xs"
              disabled={notifications.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="w-full grid grid-cols-2 px-2 bg-white border-b">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="max-h-[300px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-3",
                      !notification.read && "bg-blue-50"
                    )}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-semibold text-sm">{notification.title}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <BellOff className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No notifications</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="unread" className="max-h-[300px] overflow-y-auto">
            {notifications.filter(n => !n.read).length > 0 ? (
              <div className="divide-y">
                {notifications
                  .filter(notification => !notification.read)
                  .map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-3 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors flex items-start gap-3"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-semibold text-sm">{notification.title}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <BellOff className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No unread notifications</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="p-2 border-t bg-gray-50">
          <Button 
            variant="ghost" 
            className="w-full text-sm justify-center py-1 h-auto"
            onClick={() => setOpen(false)}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
