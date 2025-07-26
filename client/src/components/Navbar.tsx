import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate('/create-task');
    }

    return (
        <nav className="bg-gray-200 px-4 py-3 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <div className="text-lg font-semibold text-gray-800 hover:text-gray-600 cursor-pointer">
                    AbHiWaN
                </div>


                <div>
                    <button onClick={handleCreateClick} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200">
                        Create Task
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
