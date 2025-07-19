import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import NotesService from '../service/notesService'

const CreatePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error(`${title ? 'Content' : 'Title'} is required`);
            return;
        }

        try {
            const res = await NotesService.createNote({ title, content });
            toast.success("Note created successfully");
            setLoading(true);
            navigate("/");
        } catch (error) {
            if (error?.response?.status === 429) {
                toast.error("Rate limit exceeded. Please try again later.");
            }
            toast.error("Error creating note");
        }
        finally {
            setLoading(false);
        }


    }
    return (
        <div className='min-h-screen bg-base-200'>
            <div className="container mx-auto px-4 py-8">
                <div className="max-2-2xl mx-auto">
                    <Link to={"/"} className="btn btn-ghost mb-6">
                        <ArrowLeftIcon />
                        Back to Notes
                    </Link>
                    <div className="card bg-base-100 ">
                        <div className='card-body'>
                            <h2 className='card-title text-xl mb-4'>Create a New Note</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text"
                                        placeholder='Note Title'
                                        className="input input-bordered"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Content</span>
                                    </label>
                                    <textarea
                                        placeholder='Note Content'
                                        className="input input-bordered"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>

                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" type="submit" disabled={loading}>
                                        {loading ? 'Creating...' : 'Create Note'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreatePage