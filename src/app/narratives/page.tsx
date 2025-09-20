import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NarrativesPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Narrative Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page will house the narrative generator, which transforms raw operational data into strategic stories for different stakeholders.</p>
        </CardContent>
      </Card>
    </div>
  );
}
