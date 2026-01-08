import { Button } from "@/components/ui/button/Button";
import { Search } from "lucide-react";

const MainPage = () => {
  return (
    <div className="mx-auto max-w-2xl min-w-2xs flex-col">
      <div className="flex w-150 flex-col">
        <Button variant="default" size="lg">
          버튼
        </Button>
        <Button variant="default" size="icon">
          <Search />
        </Button>
        <Button variant="default" size="default">
          <Search />
          검색
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
