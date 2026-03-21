
import { createContext, useState, useEffect } from "react";

export const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch API lay danh sach mon an
    const fetchMeals = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/products");
            if (!response.ok) throw new Error("Failed to fetch products");
            let data = await response.json();
            // remap cac truong du lieu cho dung voi FE
            data = data.map((item) => ({
                _id: item.id,
                name: item.name,
                price: item.price,
                image: item.image_url,
                desc: item.desc,
                fullDesc: item.full_desc,
                time: item.time_to_prepare ? `${item.time_to_prepare} phút` : undefined,
                tag: item.tag,
                rating: item.rating,
                reviews: item.review_count,
                category: item.category,
                origin: item.origin,
                slug: item.slug,
                is_available: item.is_available,
            }));
            setMeals(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setMeals([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    return (
        <MealsContext.Provider
            value={{
                meals,
                loading,
                error,
                refreshMeals: fetchMeals,
            }}
        >
            {children}
        </MealsContext.Provider>
    );
};


