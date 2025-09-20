// src/app/goals/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Zap, Rocket, Handshake, TrendingUp, Users } from "lucide-react";

const strategicGoals = [
  {
    id: "goal-1",
    title: "Increase Annual Recurring Revenue by 20%",
    icon: Rocket,
    progress: 75,
    projects: [
      { name: "Project Phoenix", alignment: "High", status: "On Track" },
      { name: "QuantumLeap", alignment: "High", status: "In Progress" },
      { name: "Apollo", alignment: "Medium", status: "In Progress" },
    ],
  },
  {
    id: "goal-2",
    title: "Improve Customer Satisfaction by 15%",
    icon: Users,
    progress: 50,
    projects: [
      { name: "QuantumLeap", alignment: "Medium", status: "In Progress" },
      { name: "Project Nova", alignment: "Low", status: "On Hold" },
      { name: "Customer Voice", alignment: "High", status: "On Track" },
    ],
  },
  {
    id: "goal-3",
    title: "Enhance Operational Efficiency by 30%",
    icon: Zap,
    progress: 60,
    projects: [
      { name: "Orion", alignment: "High", status: "At Risk" },
      { name: "Helios", alignment: "Medium", status: "Delayed" },
      { name: "AutomateIt", alignment: "High", status: "Completed" },
    ],
  },
  {
    id: "goal-4",
    title: "Expand into New European Market",
    icon: TrendingUp,
    progress: 30,
    projects: [
      { name: "Market Entry Alpha", alignment: "High", status: "In Progress" },
      { name: "Compliance Framework", alignment: "High", status: "At Risk" },
    ],
  },
  {
    id: "goal-5",
    title: "Strengthen Strategic Partnerships",
    icon: Handshake,
    progress: 85,
    projects: [
      { name: "Partner API Integration", alignment: "High", status: "On Track" },
      { name: "Co-Marketing Campaign", alignment: "Medium", status: "Completed" },
    ],
  },
];

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Goal Mapping</CardTitle>
          <CardDescription>
            Real-time strategy alignment engine. Map operational tasks to high-level strategic goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {strategicGoals.map((goal) => (
              <AccordionItem value={goal.id} key={goal.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-4 w-full">
                    <goal.icon className="h-6 w-6 text-primary" />
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{goal.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={goal.progress} className="w-full max-w-xs h-2" />
                        <span className="text-sm font-medium text-muted-foreground">{goal.progress}%</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-10">
                    <h4 className="font-semibold mb-2 text-muted-foreground">Aligned Projects:</h4>
                    <ul className="space-y-2">
                      {goal.projects.map((project, index) => (
                        <li key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                          <span className="font-medium">{project.name}</span>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">Alignment: {project.alignment}</Badge>
                            <Badge variant={project.status === "On Track" || project.status === "Completed" ? "secondary" : "outline"}>{project.status}</Badge>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
