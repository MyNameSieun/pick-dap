import Link from "next/link";

const Header = () => {
  return (
    <header className="flex gap-4">
      <Link href={`/question`}>question</Link>
      <Link href={`/interview`}>interview</Link>
      <Link href={`/review`}>review</Link>
      <Link href={`/community`}>community</Link>
      <Link href={`/mypage`}>mypage</Link>
      <Link href={`/login`}>login</Link>
      <Link href={`/signup`}>signup</Link>
    </header>
  );
};

export default Header;
