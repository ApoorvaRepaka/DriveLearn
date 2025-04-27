type Props = {
  answer: string;
  isLoading: boolean; // Add a loading state
};

export default function ResponseDisplay({ answer, isLoading }: Props) {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">🧠 Answer</h2>
      {isLoading ? (
        <p className="text-blue-500 italic">Response is generating...</p> // Show loading message
      ) : (
        <p className="whitespace-pre-wrap">{answer || 'No response yet. Ask something!'}</p>
      )}
    </div>
  );
}