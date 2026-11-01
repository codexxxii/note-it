import MaxWidthWrapper from "@/components/max-width-wrapper";
import Nav from "@/components/nav";

export default function Laytou({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Nav />
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </div>
  );
}
