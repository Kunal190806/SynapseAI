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

const recentActivities = [
  { project: "Project Phoenix", task: "Deploy to staging", status: "Completed", user: "Alice" },
  { project: "QuantumLeap", task: "User feedback session", status: "In Progress", user: "Bob" },
  { project: "Project Phoenix", task: "Update documentation", status: "Completed", user: "Alice" },
  { project: "Project Nova", task: "Initial design mockups", status: "On Hold", user: "Charlie" },
  { project: "QuantumLeap", task: "Fix login bug", status: "In Progress", user: "David" },
];

const getStatusVariant = (status: string): "success" | "warning" | "destructive" | "secondary" | "outline" => {
    switch (status) {
      case "On Track":
        return "success";
      case "Completed":
        return "success";
      case "At Risk":
        return "warning";
      case "Delayed":
        return "destructive";
      case "In Progress":
        return "secondary";
      case "On Hold":
        return "outline";
      default:
        return "outline";
    }
  };

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl font-headline">SynapseAI</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Purpose Alignment"
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
                       <Badge variant={getStatusVariant(activity.status)}>
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
