import { useAuth } from "../../zustand/authStore";

interface ContainerAuthProps {
  children: React.ReactNode;
  title: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ContainerAuth(props: ContainerAuthProps) {
  const { children, title, handleSubmit } = props;

  const { errorMsg } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-w-[500px] mx-auto shadow-md shadow-black/20">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          {title} <span className="text-blue-500">ChatApp</span>
        </h1>
        <span className="mt-5 block text-center text-red-600 font-semibold text-lg">
          {errorMsg}
        </span>
        <form onSubmit={handleSubmit} className="mt-4">
          {children}
        </form>
      </div>
    </div>
  );
}
