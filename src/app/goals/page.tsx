// src/app/goals/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Target, Zap, Rocket, Handshake, TrendingUp, Users, Heart, Globe, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";

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

const purposeGoals = [
    {
      id: "purpose-1",
      title: "Foster a Culture of Innovation",
      icon: Lightbulb,
      description: "Encourage experimentation and creative problem-solving at all levels.",
      projects: [
        { name: "Innovation Guild", status: "On Track" },
        { name: "Internal Hackathon", status: "Completed" },
      ]
    },
    {
        id: "purpose-2",
        title: "Commit to Sustainable Practices",
        icon: Globe,
        description: "Reduce our environmental footprint and promote ecological responsibility.",
        projects: [
          { name: "Carbon Neutral Initiative", status: "In Progress" },
          { name: "Supplier Sustainability Audit", status: "On Track" },
        ]
      },
      {
        id: "purpose-3",
        title: "Champion Customer-Centricity",
        icon: Heart,
        description: "Place the customer at the heart of every decision we make.",
        projects: [
          { name: "Customer Voice Program", status: "On Track" },
          { name: "CX Journey Mapping", status: "Completed" },
        ]
      }
]

export default function GoalsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <AppNavbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Purpose & Goals</CardTitle>
              <CardDescription>
                Evaluate every action against both strategic goals and organizational values to ensure every action has a purpose.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Strategic Goals</h3>
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
                              <li key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 rounded-md bg-muted/50 gap-2">
                                <span className="font-medium">{project.name}</span>
                                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                  <Badge variant="outline">Alignment: {project.alignment}</Badge>
                                  <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Core Values & Mission</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {purposeGoals.map((goal) => (
                    <Card key={goal.id}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                            <goal.icon className="h-7 w-7 text-accent" />
                            <CardTitle className="text-lg">{goal.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{goal.description}</p>
                        <h4 className="font-semibold mb-2 text-sm">Supporting Initiatives:</h4>
                        <ul className="space-y-2">
                          {goal.projects.map((project, index) => (
                            <li key={index} className="flex items-center justify-between text-sm">
                              <span className="font-medium">{project.name}</span>
                              <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
