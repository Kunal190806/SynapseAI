import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page will provide predictive analytics and adaptive goal setting recommendations based on continuous learning from project outcomes.</p>
        </CardContent>
      </Card>
    </div>
  );
}
