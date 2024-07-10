import { Button } from "@/components";

const Action = () => {
  return (
    <div className="w-full p-2 rounded-lg">
      <div className="w-full">
        <Button
          name="Continue"
          href={"/dashboard/campaign/create_campaign?route=rewards"}
        />
      </div>
    </div>
  );
};
export default Action;
