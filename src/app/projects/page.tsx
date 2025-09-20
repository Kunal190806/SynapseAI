// src/app/projects/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const projects = [
  {
    name: "Project Phoenix",
    status: "On Track",
    progress: 95,
    strategicGoal: "Increase ARR",
    alignment: "High",
  },
  {
    name: "QuantumLeap",
    status: "In Progress",
    progress: 78,
    strategicGoal: "Increase ARR",
    alignment: "High",
  },
  {
    name: "Project Nova",
    status: "On Hold",
    progress: 45,
    strategicGoal: "Improve Customer Satisfaction",
    alignment: "Low",
  },
  {
    name: "Orion",
    status: "At Risk",
    progress: 60,
    strategicGoal: "Enhance Operational Efficiency",
    alignment: "High",
  },
  {
    name: "Helios",
    status: "Delayed",
    progress: 25,
    strategicGoal: "Enhance Operational Efficiency",
    alignment: "Medium",
  },
  {
    name: "Vega",
    status: "Completed",
    progress: 100,
    strategicGoal: "Improve Customer Satisfaction",
    alignment: "Medium",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                Display of all active projects, their status, and progress towards strategic goals.
                </CardDescription>
            </div>
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter Projects
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Strategic Goal</TableHead>
                <TableHead className="text-right">Alignment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.name}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === "Completed" || project.status === "On Track"
                          ? "secondary"
                          : project.status === "At Risk" || project.status === "Delayed"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="w-full max-w-[100px] h-2" />
                      <span className="text-muted-foreground text-sm">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{project.strategicGoal}</TableCell>
                  <TableCell className="text-right">{project.alignment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
