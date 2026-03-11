type Props = {
  children: React.ReactNode;
};

export default function ToolbarGroup({ children }: Props) {
  return <article className="flex flex-wrap items-center">{children}</article>;
}
