import { LayoutDashboard, Goal, KanbanSquare, FileText, Lightbulb, TestTube, Zap } from "lucide-react";

export const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/goals', label: 'Goal Mapping', icon: Goal },
  { href: '/projects', label: 'Projects', icon: KanbanSquare },
  { href: '/narratives', label: 'Narratives', icon: FileText },
  { href: '/insights', label: 'Insights', icon: Lightbulb },
  { href: '/simulation', label: 'Simulation', icon: TestTube },
  { href: '/project-management', label: 'Project Management', icon: Zap },
];
