"use client";
import axios from "axios";
import { useState, useEffect } from "react";

function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    "https://newsdata.io/api/1/latest?apikey=pub_5281385ba9e64182517f03918881c22ab1bf1&language=th"
                );
                setNews(response.data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center my-6">
                    ข่าวล่าสุด
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {news.map((item: any) => (
                        <div key={item.article_id}>
                            <h2 className="font-semibold mb-2">
                                {item.title}
                            </h2>

                            {item.image_url && (
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="rounded"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;
