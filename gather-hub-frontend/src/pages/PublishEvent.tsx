import { CreateEvent } from "../components/CreateEvent";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useCustomTitle } from "../hooks/CustomTitle";

export const PublishEvent = () => {
    useCustomTitle('GatherHub | Publish');
    const Navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white">
            <Appbar
                width="w-20"
                label="Logout"
                onclick={() => {
                    localStorage.removeItem("token");
                    Navigate("/login");
                }}
            />
            <div className="p-4">
                <CreateEvent />
            </div>
        </div>
    );
};
