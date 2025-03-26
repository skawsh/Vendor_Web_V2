
import React from 'react';
import { LogOut } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface AccountSettingsSectionProps {
  handleLogout: () => void;
}

const AccountSettingsSection: React.FC<AccountSettingsSectionProps> = ({ handleLogout }) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences and settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <div className="grid gap-2">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Order Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when order status changes
                  </p>
                </div>
                <div>
                  <input type="checkbox" id="order-updates" defaultChecked={true} className="h-4 w-4 rounded border-gray-300" />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Customer Messages</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for new customer inquiries
                  </p>
                </div>
                <div>
                  <input type="checkbox" id="customer-messages" defaultChecked={true} className="h-4 w-4 rounded border-gray-300" />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <h4 className="font-medium">Marketing Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional offers and news
                  </p>
                </div>
                <div>
                  <input type="checkbox" id="marketing" defaultChecked={false} className="h-4 w-4 rounded border-gray-300" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-4">
            <h3 className="text-lg font-medium">Security Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button onClick={() => toast.success('Password updated successfully')} className="bg-primary hover:bg-primary/90">
                Update Password
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountSettingsSection;
