import Image from "next/image";
import CreateInstanceDialog from "@/components/instance/create-instance";

export default function Home() {
  return (
    <section>
      <div className="flex items-end">
        <CreateInstanceDialog />
      </div>
    </section>
  );
}
