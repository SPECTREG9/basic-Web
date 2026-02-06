"use client";
import axios from "axios";
import { useState, useEffect } from "react";

function Game() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(
                    "https://www.cheapshark.com/api/1.0/deals"
                );
                setGames(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-center my-6">
                    เกมลดราคา
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {games.map((item: any) => (
                        <a
                            key={item.dealID}
                            href={`https://www.cheapshark.com/redirect?dealID=${item.dealID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <div>
                                <h2 className="font-semibold mb-2">
                                    {item.title}
                                </h2>

                                <img
                                    src={item.thumb}
                                    alt={item.title}
                                    className="rounded"
                                />

                                <p className="text-sm mt-2">
                                    ราคา {item.salePrice}$
                                    <span className="line-through ml-2 text-gray-400">
                                        {item.normalPrice}$
                                    </span>
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Game;
