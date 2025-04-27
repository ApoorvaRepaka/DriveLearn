import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ArrowPathIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function HistoryPage() {
    const [history, setHistory] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Set default loading state

    const router = useRouter();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User not logged in.');
            router.push('/login');
            return;
        }

        axios.post('/api/history', { userId })
            .then(res => setHistory(res.data.data.history))
            .catch(err => console.error('Error fetching history:', err))
            .finally(() => setIsLoading(false)); // Stop loading state once data is fetched
    }, []);


    const handleSelect = (item: string) => {
        setSelectedItems(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };



    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            await axios.post("/api/delete-history", {
                userId: localStorage.getItem("userId"),
                items: selectedItems
            });

            setHistory((prev) => prev.filter((item) => !selectedItems.includes(item)));
            setSelectedItems([]);
        } catch (err) {
            console.error("Error deleting history:", err);
            alert("Failed to delete history.");
        } finally {
            setIsDeleting(false);
        }
    };



    return (
        <div className="min-h-screen flex flex-col items-center px-8 sm:px-12 md:px-20 lg:px-32 xl:px-40 bg-gradient-to-b from-[#f9f6e7] to-white w-full">
            <main className="relative max-w-5xl w-full bg-white shadow-lg p-8 rounded-lg mt-12 sm:mt-16 space-y-6">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="absolute top-4 left-4 bg-transparent hover:bg-gray-200 p-2 rounded-full transition-all flex items-center"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-3xl sm:text-4xl font-bold text-center">📜 History</h1>
                {selectedItems.length > 0 && (
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all"
                    >
                        {isDeleting ? (
                            <ArrowPathIcon className="w-5 h-5 animate-spin text-white" />
                        ) : (
                            "Delete Selected"
                        )}
                    </button>
                )}

                {isLoading ? (
                    <p className="text-gray-500 text-center">⏳ History is being loaded...</p>
                ) : history.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                        {history.map((q, index) => (
                            <li key={index} className="text-gray-700 flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    onChange={() => handleSelect(q)}
                                    checked={selectedItems.includes(q)}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span>{q}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">No previous questions yet.</p>
                )}


            </main>
        </div>
    );
}