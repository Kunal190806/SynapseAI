import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GoalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Goal Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Real-time strategy alignment engine. This page will allow you to map operational tasks to high-level strategic goals.</p>
        </CardContent>
      </Card>
    </div>
  );
}
