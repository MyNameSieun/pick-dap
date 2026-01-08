const Tag = ({
  size = "small",
  color,
  children,
}: {
  size: "small" | "big";
  color: "blue" | "red" | "gray" | "yellow" | "green" | "purple";
  children: string;
}) => {
  return (
    <>
      {size === "small" && (
        <span
          className={`h-fit px-2 text-tag-text-${color} bg-tag-bg-${color} c2 rounded-3xl text-center`}
        >
          {children}
        </span>
      )}
      {size === "big" && <span className="h-6 px-4">{children}</span>}
    </>
  );
};
export default Tag;
