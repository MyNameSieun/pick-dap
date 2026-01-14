interface DetailRowProps {
  label: string;
  children: React.ReactNode;
  isEmpty: boolean;
}
const DetailRow = ({ label, children, isEmpty = false }: DetailRowProps) => {
  if (isEmpty) return null;
  return (
    <div className="flex gap-15">
      <h4 className="mb-2 text-lg font-bold whitespace-nowrap">{label}</h4>
      <div className="flex-1 leading-relaxed text-gray-800">{children}</div>
    </div>
  );
};

export default DetailRow;
