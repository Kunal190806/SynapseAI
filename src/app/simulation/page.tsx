import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SimulationPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Decision Simulation Sandbox</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page will allow leaders to run "what-if" scenarios to project outcomes on timelines, budgets, and goals before making key decisions.</p>
        </CardContent>
      </Card>
    </div>
  );
}
