// src/app/support/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AppHeader from "@/components/layout/header";
import AppNavbar from "@/components/layout/navbar";

const faqs = [
  {
    question: "What is the Purpose Alignment Index?",
    answer: "The Purpose Alignment Index is a score that evaluates how well tasks, projects, and meetings align with your organization's strategic goals and core values. It helps ensure that your team's efforts are always contributing to the bigger picture."
  },
  {
    question: "How does Narrative Immersion Mode work?",
    answer: "Narrative Immersion Mode transforms your project data into an interactive story. Instead of looking at charts and tables, you can see your team's progress unfold as a journey, making the work more engaging and meaningful."
  },
  {
    question: "Can I integrate SynapseAI with other tools?",
    answer: "We are currently developing integrations for popular project management and communication tools. Stay tuned for updates on our integration roadmap."
  }
];

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <AppNavbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Support</CardTitle>
              <CardDescription>
                Get help with SynapseAI and find answers to your questions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* FAQ Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <Separator />

              {/* Contact Form */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="e.g., Issue with Project Phoenix" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Please describe your issue in detail..." className="min-h-[150px]" />
                  </div>
                  <Button>Submit Request</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
