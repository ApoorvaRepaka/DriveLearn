type Props = {
    answer: string;
  };
  
  export default function ResponseDisplay({ answer }: Props) {
    return (
      <div className="mt-6 p-4 bg-gray-100 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">🧠 Answer</h2>
        <p className="whitespace-pre-wrap">{answer || 'No response yet. Ask something!'}</p>
      </div>
    );
  }
  