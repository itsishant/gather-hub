import { useEffect, useState } from "react";
import { InputBox2 } from "./Input";
import { ButtonComp } from "./Button";
import axios from "axios";
import { UserIdFromToken } from "../hooks/UserIdFromToken";
import { useNavigate } from "react-router-dom";
import { TokenRole } from "../hooks/TokenRole";

export const CreateEvent = () => {
    interface ApiResponse {
        id: string | "";
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const Navigate = useNavigate();

    const UserIdByToken = UserIdFromToken();
    const DecodedRole = TokenRole();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token || DecodedRole !== "ORGANIZER") {
            alert("Access denied / Not Logged in");
            Navigate("/login");
        }
    }, [token, Navigate, DecodedRole]);

    const handlePublish = async () => {
        try {
            const response = await axios.post<ApiResponse>(`${import.meta.env.VITE_BACKEND_URL}/event`, {
                title,
                description,
                date,
                location,
                category,
                organizerId: UserIdByToken
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            Navigate(`/event/${response.data.id}`);
        } catch (error) {
            console.error("Error occurred while creating event", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
            <div className="w-full max-w-md bg-zinc-900 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Create New Event</h1>
                <InputBox2
                    onchange ={(e) => setTitle(e.target.value)}
                    label="Title"
                    placeholder="Add your Title"
                />
                <InputBox2
                    onchange ={(e) => setDescription(e.target.value)}
                    label="Description"
                    placeholder="Add your Description"
                />
                <InputBox2
                    onchange ={(e) => setCategory(e.target.value)}
                    label="Category"
                    placeholder="Add Category"
                />
                <InputBox2
                    onchange ={(e) => setLocation(e.target.value)}
                    label="Location"
                    placeholder="Add Location"
                />
                <InputBox2
                    onchange ={(e) => setDate(e.target.value)}
                    label="Date"
                    type="date"
                    placeholder="Add Date"
                />
                <div className="mt-4 text-center">
                    <ButtonComp
                        onclick={handlePublish}
                        label="Publish"
                        width="w-36"
                    />
                </div>
            </div>
        </div>
    );
};
