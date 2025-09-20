import { LayoutDashboard, Goal, KanbanSquare, FileText, Lightbulb, TestTube, Zap, BrainCircuit, Users } from "lucide-react";

export const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/goals', label: 'Purpose & Goals', icon: Goal },
  { href: '/projects', label: 'Projects', icon: KanbanSquare },
  { href: '/narratives', label: 'Narrative Studio', icon: FileText },
  { href: '/insights', label: 'Collective Intelligence', icon: Users },
  { href: '/simulation', label: 'Simulation', icon: TestTube },
  { href: '/project-management', label: 'Adaptive Management', icon: Zap },
];
