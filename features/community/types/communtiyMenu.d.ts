interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  className?: string;
  setId?: string;
  onTabChange?: (id: string) => void;
}
