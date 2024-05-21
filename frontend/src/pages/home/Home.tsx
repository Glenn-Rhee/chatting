import MessageContainer from "../../components/Home/messages/MessageContainer";
import Sidebar from "../../components/Home/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[700px] w-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
