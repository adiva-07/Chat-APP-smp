import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-28 lg:w-80 flex flex-col transition-all duration-300 bg-gradient-to-br from-primary/10 via-base-100/80 to-base-200/80 dark:from-primary/20 dark:via-base-200/90 dark:to-base-300/90 backdrop-blur-xl shadow-2xl rounded-l-3xl rounded-r-none border-r border-base-200/60 max-w-sm px-0 pt-0 pb-5 pr-3">
      <div className="border-b border-base-200/60 w-full px-6 py-4 bg-base-100/80 rounded-tl-3xl shadow-sm font-sans">
        <div className="flex items-center gap-3 mb-2">
          <Users className="size-6 text-primary" />
          <span className="font-bold hidden lg:block tracking-wide text-base-content text-lg">Contacts</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 mt-1">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm accent-primary"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-primary/70 font-medium">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full pt-2 pb-3 flex-1 bg-base-200/60 rounded-bl-2xl custom-scrollbar min-h-0 flex flex-col items-center">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-[97%] flex items-center gap-4 group
              bg-base-100/70 backdrop-blur-lg shadow-md
              hover:shadow-xl hover:scale-[1.025] hover:border-primary/60 hover:bg-primary/10 transition-all duration-300
              ${selectedUser?._id === user._id
                ? "border-2 border-primary/70 bg-primary/10 shadow-xl scale-[1.03] text-primary font-semibold ring-2 ring-primary/30 ring-offset-2 ring-offset-base-200"
                : "border border-base-200/60"}
              rounded-xl mb-4 min-h-[64px] lg:min-h-[72px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 overflow-visible relative
              first:mt-0 mt-1
            `}
          >
            <div className="relative flex-shrink-0 flex items-center justify-center">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className={`w-11 h-11 object-cover rounded-full border-2 ${selectedUser?._id === user._id ? "border-primary/60" : "border-base-200/60"} shadow group-hover:shadow-primary/20 transition-all bg-base-200`}
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-base-100"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex flex-col justify-center">
              <div className="font-semibold truncate text-base-content group-hover:text-primary transition-colors text-base leading-tight tracking-wide font-sans">
                {user.fullName}
              </div>
              <div className={`text-xs mt-0.5 font-medium ${onlineUsers.includes(user._id) ? "text-green-500" : "text-zinc-400"} font-sans`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
      {/* Custom scrollbar for sidebar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #23272f44;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
      {/* Custom scrollbar for sidebar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #23272f44;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
