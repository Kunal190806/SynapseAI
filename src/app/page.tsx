import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatCard from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AlignmentChart from "@/components/dashboard/alignment-chart";
import ProgressChart from "@/components/dashboard/progress-chart";
import TaskDistributionChart from "@/components/dashboard/task-distribution-chart";
import { Activity, Target, CheckCircle, BrainCircuit } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ChatInterface from "@/components/chat-interface";

const recentActivities = [
  { project: "Project Phoenix", task: "Deploy to staging", status: "Completed", user: "Alice" },
  { project: "QuantumLeap", task: "User feedback session", status: "In Progress", user: "Bob" },
  { project: "Project Phoenix", task: "Update documentation", status: "Completed", user: "Alice" },
  { project: "Project Nova", task: "Initial design mockups", status: "On Hold", user: "Charlie" },
  { project: "QuantumLeap", task: "Fix login bug", status: "In Progress", user: "David" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-10 w-10 text-primary"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.28-.14-1.2-1.1-1.2-1.1s-.42-1.06-1.7-1.06c-1.28 0-1.7.94-1.7.94s-1.17 1.05-1.37 1.22c-.2.17-.45.34-.73.5-1.26.73-2.77 1.12-4.2 1.12-.22 0-.43-.02-.64-.05C9.02 18.48 11.18 20 12 20c2.03 0 3.86-1.19 4.7-2.95.14-.28.25-.57.34-.87.06-.2.09-.4.1-.6.06-.22.06-.45 0-.68zM12 4c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1zm0 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
          </svg>
          <h1 className="text-3xl font-headline font-bold tracking-tight">
            SynapseAI
          </h1>
        </div>
        <p className="text-muted-foreground max-w-xl">
          The Cognitive Nervous System for Organizations. Real-time alignment between strategic intent and operational execution.
        </p>
        <ChatInterface />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Overall Alignment"
          value="92%"
          icon={Target}
          description="+5% from last month"
          footer={<Progress value={92} className="h-2" />}
        />
        <StatCard
          title="Active Projects"
          value="12"
          icon={BrainCircuit}
          description="3 new this week"
        />
        <StatCard
          title="Tasks Completed"
          value="348"
          icon={CheckCircle}
          description="+15% from last week"
        />
        <StatCard
          title="Narrative Strength"
          value="8.5/10"
          icon={Activity}
          description="Consistently strong"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alignment Over Time</CardTitle>
            <CardDescription>
              How well operational tasks are aligning with strategic goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlignmentChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>
              Completion status of active projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              A log of the latest tasks and updates across all projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{activity.project}</TableCell>
                    <TableCell className="text-muted-foreground">{activity.task}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={activity.status === "Completed" ? "secondary" : "outline"}>
                        {activity.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>
              Breakdown of tasks by strategic goal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaskDistributionChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
