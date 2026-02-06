"use client";
import axios from "axios";
import { useState, useEffect } from "react";

function Jikan() {
    const [animate, setAnimate] = useState([]);

    useEffect(() => {
        const fetchAnimation = async () => {
            try {
                const response = await axios.get(
                    "https://api.jikan.moe/v4/anime"
                );
                setAnimate(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAnimation();
    }, []);
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center my-6">
                    รายการอนิเมะจาก jikan
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {animate.map((item: any) => (
                        <div key={item.mal_id}>
                            <h2 className="font-semibold mb-2">{item.title}</h2>
                            <img
                                src={item.images.jpg.image_url}
                                alt={item.title}
                                className="rounded"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Jikan;
