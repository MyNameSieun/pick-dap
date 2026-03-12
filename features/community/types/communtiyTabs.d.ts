interface TabItem {
  id: string;
  label: string;
  order?: number;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  className?: string;
  setId?: string;
  order?: number;
  onTabChange?: (id: string) => void;
}
