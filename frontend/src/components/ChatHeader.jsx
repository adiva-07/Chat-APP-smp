import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-base-300 bg-base-100/80 rounded-tr-3xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-12 rounded-full relative border-2 border-primary/40 shadow">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-base-content text-lg leading-tight">{selectedUser.fullName}</h3>
            <p className={`text-xs mt-0.5 ${onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-base-content/70"}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-primary transition-colors">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
