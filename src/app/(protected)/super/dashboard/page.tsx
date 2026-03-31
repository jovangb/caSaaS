import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const SuperDashboard = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col items-center justify-center w-full pt-10 min-h-screen">
            <div>
                <h3>Super Dashboard</h3>
            </div>

            <div>
                Welcome {session?.user.name} you are a {session?.user.role}
            </div>
        </div>
    );
};

export default SuperDashboard;