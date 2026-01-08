import { Button } from "@/components/ui/button/Button";
import { Heart, Settings } from "lucide-react";

const MainPage = () => {
  return (
    <div className="mx-auto w-2xs flex-col">
      <h1 className="text-tag-text-red shadow-sm">h1 Tag</h1>
      <h2 className="shadowsm">h2 Tag</h2>
      <h3>h3 Tag</h3>
      <h4>h4 Tag</h4>
      <h5>h5 Tag</h5>
      <h6>h6 Tag</h6>

      <br />

      <div className="b1">text-body1</div>
      <div className="b2">text-body2</div>

      <br />

      <div className="c1">text-caption1</div>
      <div className="c2">text-caption2</div>

      <br />

      <div className="bg-bg-default flex w-100 flex-col gap-4">
        <Button size="icon">
          <Settings />
        </Button>
        <Button className="w-fit" variant="link" size="sm">
          Android
        </Button>
        <Button className="w-fit" variant="white" size="sm">
          <Heart className="fill-point-heart" />
          123
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
