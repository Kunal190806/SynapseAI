// src/app/teams/page.tsx
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppHeader from '@/components/layout/header';
import AppNavbar from '@/components/layout/navbar';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';
import {
  Video,
  Calendar,
  Folder,
  Mail,
  FileText,
  FileSpreadsheet,
  Presentation,
  Plus,
  Clock,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const workspaceApps = [
  { name: 'Meet', icon: Video, url: 'https://meet.google.com' },
  { name: 'Calendar', icon: Calendar, url: 'https://calendar.google.com' },
  { name: 'Drive', icon: Folder, url: 'https://drive.google.com' },
  { name: 'Gmail', icon: Mail, url: 'https://gmail.com' },
  { name: 'Docs', icon: FileText, url: 'https://docs.google.com' },
  { name: 'Sheets', icon: FileSpreadsheet, url: 'https://sheets.google.com' },
  { name: 'Slides', icon: Presentation, url: 'https://slides.google.com' },
];

const upcomingEvents = [
  {
    time: '11:00 AM',
    title: 'Q3 Strategy Review',
    participants: ['Alice', 'Bob', 'Charlie'],
  },
  {
    time: '1:00 PM',
    title: 'Project Phoenix Sync',
    participants: ['David', 'Eve', 'Frank'],
  },
  {
    time: '3:30 PM',
    title: 'Design Critique',
    participants: ['Grace', 'Heidi', 'Ivan'],
  },
];

const recentFiles = [
    { name: "Q3 Marketing Plan", type: "Docs", editor: "Alice", time: "2 hours ago" },
    { name: "Sales Projections Q4", type: "Sheets", editor: "Bob", time: "5 hours ago" },
    { name: "New Feature Launch", type: "Slides", editor: "Charlie", time: "1 day ago" },
    { name: "User Research Synthesis", type: "Docs", editor: "David", time: "2 days ago" },
];


export default function TeamsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <AppNavbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('Teams & Collaboration')}</CardTitle>
              <CardDescription>
                {t('Access your Google Workspace apps and see what your team is working on.')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Google Workspace App Shortcuts */}
              <div>
                <h3 className="text-xl font-semibold mb-4">{t('Google Workspace')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                  {workspaceApps.map((app) => (
                    <Link href={app.url} target="_blank" key={app.name}>
                        <Card className="flex flex-col items-center justify-center p-4 hover:bg-muted/50 transition-colors h-full">
                            <app.icon className="h-8 w-8 mb-2 text-primary" />
                            <p className="text-sm font-medium">{t(app.name)}</p>
                        </Card>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Google Calendar & Meet Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> {t('Upcoming Events')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="text-muted-foreground font-medium w-20">{event.time}</div>
                          <div className="flex-1">
                            <p className="font-semibold">{t(event.title)}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                               <Users className="h-4 w-4" />
                               <span>{event.participants.join(', ')}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">{t('Join')}</Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                        <Input placeholder={t("Enter meeting code")} />
                        <Button>{t("Join")}</Button>
                        <Button variant="secondary"><Plus className="mr-2 h-4 w-4" /> {t("New")}</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Google Drive Integration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Folder className="h-5 w-5" /> {t('Recent Files')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {recentFiles.map((file, index) => (
                        <li key={index} className="flex items-center gap-4">
                           <div className="p-2 bg-muted rounded-md">
                            {file.type === "Docs" && <FileText className="h-5 w-5 text-blue-500" />}
                            {file.type === "Sheets" && <FileSpreadsheet className="h-5 w-5 text-green-500" />}
                            {file.type === "Slides" && <Presentation className="h-5 w-5 text-yellow-500" />}
                           </div>
                           <div className="flex-1">
                                <p className="font-medium">{t(file.name)}</p>
                                <p className="text-sm text-muted-foreground">{t("Edited by")} {file.editor} &middot; {file.time}</p>
                           </div>
                           <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://picsum.photos/seed/${file.editor}/32/32`} />
                                <AvatarFallback>{file.editor.charAt(0)}</AvatarFallback>
                           </Avatar>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
