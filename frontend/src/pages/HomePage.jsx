import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import NotesService from '../service/notesService';
import { toast } from 'react-hot-toast'
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNotes() {
            try {
                const res = await NotesService.getAllNotes();
                setNotes(res?.data?.data || []);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Error fetching notes:");
                if (error?.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to fetch notes. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, []);

    return (
        <div className='min-h-screen'>
            <Navbar />

            {isRateLimited && <RateLimitedUI />}

            <div className='max-w-7xl mx-auto px-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

                {notes.length === 0 && !isRateLimited && <NotesNotFound />}

                {notes.length > 0 && !loading && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map(note => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage