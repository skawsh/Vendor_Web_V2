
import React, { useState } from 'react';
import { Bell, X, AlertCircle, CheckCircle, Info, Package } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample notification data
const initialNotifications = [
  {
    id: 1,
    title: 'New Order Received',
    message: 'You have received a new order #ORD-1234.',
    type: 'info',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 2,
    title: 'Payment Confirmed',
    message: 'Payment for order #ORD-1230 has been confirmed.',
    type: 'success',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'Order Ready for Pickup',
    message: 'Order #ORD-1228 is ready for pickup.',
    type: 'info',
    time: '3 hours ago',
    read: false,
  },
  {
    id: 4,
    title: 'Order Delayed',
    message: 'Order #ORD-1225 is delayed due to high volume.',
    type: 'warning',
    time: 'Yesterday',
    read: true,
  },
];

const NotificationArea = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isExpanded, setIsExpanded] = useState(true);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Notifications</CardTitle>
            {unreadCount > 0 && (
              <span className="rounded-full bg-primary text-white px-2 py-0.5 text-xs font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs h-8"
              >
                Mark all as read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs h-8"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
        <CardDescription>Recent updates and alerts</CardDescription>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-2">
          {notifications.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>No notifications at the moment</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex justify-between items-start p-3 rounded-lg transition-colors ${
                    notification.read ? 'bg-background' : 'bg-muted/50'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getIconByType(notification.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default NotificationArea;
