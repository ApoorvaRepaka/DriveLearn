type Props = {
  answer: string;
  isLoading: boolean; // Add a loading state
};

export default function ResponseDisplay({ answer, isLoading }: Props) {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded shadow max-w-lg mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
      <h2 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
        🧠 <span>Answer</span>
      </h2>
      {isLoading ? (
        <p className="text-blue-500 italic text-sm sm:text-base">Response is generating...</p>
      ) : (
        <p className="whitespace-pre-wrap text-sm sm:text-base md:text-lg lg:text-xl">
          {answer || "No response yet. Ask something!"}
        </p>
      )}
    </div>
  );
}
