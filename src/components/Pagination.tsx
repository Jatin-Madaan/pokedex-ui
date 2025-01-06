
import { useState, useEffect } from "react";
const Pagination = ({ loadCards } : any) => {
    const [limit] = useState(12);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    const fetchData = async (page: any) => {
        if (!hasMore || loading) return;

        setLoading(true);
        try {
            const response = await loadCards(page * limit, limit);

            const newData = response?.data;

            if (newData?.length < limit) {
                setHasMore(false); // No more data to fetch
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page).then(r => r);
    }, [page]);

    // Handle next page
    const handleNextPage = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    // Handle previous page (optional)
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
            setHasMore(true); // Reset hasMore for backward navigation
        }
    };
    return (
        <div>
            <ul className="pagination">
                <li>{hasMore && !loading && (<a href="#" className="icon" onClick={handlePreviousPage} hidden={page === 1 || loading}  >← Previous</a>)}</li>
                <li>{hasMore && !loading && (<a href="#" className="icon" onClick={handleNextPage} hidden={!hasMore || loading}>Next →</a>)}</li>
            </ul>
        </div>
    );
};

export default Pagination;