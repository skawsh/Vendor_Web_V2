import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent className="text-sm text-muted-foreground p-4">{content}</CardContent>
      )}
    </Card>
  );
};

export default function Settings() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      <Separator className="my-4" />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your general preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Dark Mode</Label>
              <Switch id="theme" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Accordion
          title="Privacy Settings"
          content="Here you can manage your privacy settings. This is a longer description to test the accordion functionality."
        />

        <Accordion
          title="Advanced Settings"
          content="Advanced settings for power users. Use with caution."
        />
      </div>
    </div>
  );
}
