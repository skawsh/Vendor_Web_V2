import React, { useState } from 'react';
import { Bell, Mail, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    newOrder: true,
    orderStatus: true,
    deliveryUpdates: true,
    promotions: false
  });

  const [pushNotifications, setPushNotifications] = useState({
    newOrder: true,
    orderStatus: true,
    deliveryUpdates: true,
    promotions: false
  });

  const [services, setServices] = useState({
    quickWash: true,
    dryClean: true,
    ironing: true,
    heavyItems: false
  });

  const handleEmailNotificationChange = (key: string) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
    toast.success('Email notification settings updated');
  };

  const handlePushNotificationChange = (key: string) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
    toast.success('Push notification settings updated');
  };

  const handleServiceChange = (key: string) => {
    setServices(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
    toast.success('Service settings updated');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Services Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="quick-wash">Quick Wash Service</Label>
              <Switch
                id="quick-wash"
                checked={services.quickWash}
                onCheckedChange={() => handleServiceChange('quickWash')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dry-clean">Dry Cleaning Service</Label>
              <Switch
                id="dry-clean"
                checked={services.dryClean}
                onCheckedChange={() => handleServiceChange('dryClean')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ironing">Ironing Service</Label>
              <Switch
                id="ironing"
                checked={services.ironing}
                onCheckedChange={() => handleServiceChange('ironing')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="heavy-items">Heavy Items Service</Label>
              <Switch
                id="heavy-items"
                checked={services.heavyItems}
                onCheckedChange={() => handleServiceChange('heavyItems')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Notifications Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-new-order">New Order Notifications</Label>
              <Switch
                id="email-new-order"
                checked={emailNotifications.newOrder}
                onCheckedChange={() => handleEmailNotificationChange('newOrder')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-order-status">Order Status Updates</Label>
              <Switch
                id="email-order-status"
                checked={emailNotifications.orderStatus}
                onCheckedChange={() => handleEmailNotificationChange('orderStatus')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-delivery">Delivery Updates</Label>
              <Switch
                id="email-delivery"
                checked={emailNotifications.deliveryUpdates}
                onCheckedChange={() => handleEmailNotificationChange('deliveryUpdates')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-promotions">Promotional Emails</Label>
              <Switch
                id="email-promotions"
                checked={emailNotifications.promotions}
                onCheckedChange={() => handleEmailNotificationChange('promotions')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Push Notifications Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Push Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="push-new-order">New Order Notifications</Label>
              <Switch
                id="push-new-order"
                checked={pushNotifications.newOrder}
                onCheckedChange={() => handlePushNotificationChange('newOrder')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-order-status">Order Status Updates</Label>
              <Switch
                id="push-order-status"
                checked={pushNotifications.orderStatus}
                onCheckedChange={() => handlePushNotificationChange('orderStatus')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-delivery">Delivery Updates</Label>
              <Switch
                id="push-delivery"
                checked={pushNotifications.deliveryUpdates}
                onCheckedChange={() => handlePushNotificationChange('deliveryUpdates')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-promotions">Promotional Notifications</Label>
              <Switch
                id="push-promotions"
                checked={pushNotifications.promotions}
                onCheckedChange={() => handlePushNotificationChange('promotions')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
