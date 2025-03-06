import { Editor } from "@tiptap/react";
import { Dispatch, SetStateAction, JSX } from "react";
import { ApiError, VerifyEmailResponse } from "../auth/interfaces";
import socket from "@/api/utils/socket";

export interface ProfileAvatarProps {
  src?: string | null;
  alt: string;
  size?: number;
  variant?: "rounded" | "square";
}

export interface ChatHeaderProps {
  isGroupChat: boolean;
}

export interface UserChatHeaderProps {
  isUserOnline: boolean;
}

export interface GroupChatHeaderProps {}

export interface GroupHeaderProps {
  conversationId: string;
}

export interface Group {
  group_id: string;
  group_name: string;
  group_avatar: string | null;
  member_count: string;
}

export interface Member {
  id: string;
  username: string;
  avatar_url: string | null;
}

export interface GroupInfoResponse {
  group: Group;
  members: Member[];
}

export interface GroupMembersProps {
  members: Member[];
}

export interface CloseButtonProps {
  onClick: () => void;
  size?: number;
  variant?: "default" | "absolute"; // ✅ Supports two styling variants
}

export interface AuthModalProps {
  onClose: () => void;
  mode: "signup" | "login";
  toggleMode: () => void;
  onSignupComplete?: (email: string) => void;
}

export interface SignupProps {
  onSignupComplete?: (email: string) => void;
}

export interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showStrength?: boolean;
  passwordStrength?: string;
}

export interface ButtonProps {
  type: "submit" | "button";
  isLoading?: boolean;
  children: React.ReactNode;
}

export interface OverlayProps {
  children: React.ReactNode;
  onClose?: () => void; // ✅ Optional close-on-click-outside
}

export interface APIError {
  validation?: string;
  code?: number;
  message?: string;
  path?: string;
}

export interface CreateGroupModalProps {
  onClose: () => void;
}

export interface User {
  id: string;
  username: string;
  avatar_url: string | null;
  display_name: string;
}

export interface MemberDropdownProps {
  users: User[];
  isLoading: boolean;
  selectedMembers: string[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export interface ButtonsProps {
  type?: "button" | "submit";
  isLoading?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export interface EditContactModalProps {
  initialEmail: string;
  initialContact: string;
  onClose: () => void;
  onSave: (email: string, contact: string) => void;
}

export interface EditProfileModalProps {
  onClose: () => void;
}

export interface ProfileFormProps {
  name: string;
  username: string;
  status: string;
  onNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export interface ProfileAvatarSectionProps {
  avatar: string | File;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export interface ProfileModalProps {
  onClose: () => void;
}

export interface ProfileHeaderProps {
  onClose: () => void;
}

export interface ProfileDetailsProps {
  name: string;
  username: string;
  status: string;
  onEditProfile: () => void;
}

export interface ProfileContactProps {
  email: string;
  onEditContact: () => void;
}

export interface InnerNavbarProps {
  unreadChats: Set<string>;
}

export interface NavbarSectionProps {
  title: string;
  isExpanded: boolean;
  toggleSection: () => void;
  children: React.ReactNode;
}

export interface UserItemProps {
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
    display_name: string;
  };
  isSelected: boolean;
  isUnread: boolean;
  onSelect: (
    id: string,
    username: string,
    avatar_url: string | null,
    display_name: string
  ) => void;
}

export interface GroupItemProps {
  group: {
    group_id: string;
    group_name: string;
    group_avatar: string | null;
    member_count: string;
  };
  isSelected: boolean;
  isUnread: boolean;
  onSelect: (
    id: string,
    name: string,
    avatar: string | null,
    memberCount: string
  ) => void;
}

export interface MessageInputProps {
  conversationId: string;
}

export interface ToolbarProps {
  editor: Editor | null;
}

export interface ImagePreviewProps {
  selectedFiles: File[];
  removeSelectedFile: (index: number) => void;
}

export interface BottomToolbarProps {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  isDisabled: boolean;
}

export interface Message {
  id: string;
  sender_id: string;
  display_name: string;
  content: string;
  created_at: string;
  type: "text" | "media";
  file_paths: string[] | null;
  avatar_url: string | null;
  conversation_id: string;
}

export interface MessageListProps {
  conversationId: string;
}

export interface MessageItemProps {
  message: Message;
}

export interface MediaAttachmentsProps {
  filePaths: string[] | null;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface DownloadLink {
  label: string;
  href: string;
}

export interface RightSectionProps {
  navLinks: NavLink[];
  downloadLinks: DownloadLink[];
}

export interface NavItem {
  icon: JSX.Element;
  label: string;
}

// export interface RightSectionProps {
//   isLoading: boolean;
//   user?: UserProfile;
//   setIsProfileOpen: Dispatch<SetStateAction<boolean>>;
// }

export interface UserProfile {
  avatar_url?: string;
  display_name?: string;
}

export interface ProfileSectionProps {
  isLoading: boolean;
  user?: UserProfile;
  setIsProfileOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ProfileModalWrapperProps {
  setIsProfileOpen: Dispatch<SetStateAction<boolean>>;
}

export interface LeftContentProps {
  setAuthMode: Dispatch<SetStateAction<"signup" | "login">>;
  setAuthModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface AuthModalWrapperProps {
  isAuthModalOpen: boolean;
  setAuthModalOpen: Dispatch<SetStateAction<boolean>>;
  authMode: "signup" | "login";
  setAuthMode: Dispatch<SetStateAction<"signup" | "login">>;
  setEmail: Dispatch<SetStateAction<string>>;
  setConfirmationOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ConfirmationModalWrapperProps {
  isConfirmationOpen: boolean;
  setConfirmationOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
}

export interface GroupDetails {
  id: string;
  name: string;
  avatar_url: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  members: Member[];
}

export interface Member {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
}

export interface ChatDetails {
  id: string;
  username: string;
  avatar_url?: string | null;
  display_name: string;
  type: "user";
}

export interface GroupInterface {
  id: string;
  group_name: string;
  group_avatar: string;
  created_at: string;
}

export interface CreateGroupData {
  group_name: string;
  group_avatar: string;
  members: string[];
}

export interface MessageInterface {
  id: string;
  conversation_id: string;
  sender_id: string;
  display_name: string;
  content: string;
  created_at: string;
  type: string;
}

export interface UseLoginResponse {
  login: (data: { email: string; password: string }) => Promise<void>;
  isPending: boolean;
  isError: boolean;
  error?: ApiError;
  reset: () => void;
}

export interface ErrorResponseData {
  message?: string;
  statusCode?: number;
}

export interface UseSignupResponse {
  signup: (data: {
    email: string;
    password: string;
    display_name: string;
    username: string;
  }) => Promise<void>;
  isPending: boolean;
  isError: boolean;
  error?: ApiError;
  reset: () => void;
}

export interface UseVerifyEmailResponse {
  verify: (data: { email: string; verification_code: string }) => Promise<void>;
  isPending: boolean;
  isError: boolean;
  error?: string;
  data?: VerifyEmailResponse;
  reset: () => void;
}

export interface SocketContextType {
  socket: typeof socket;
  isConnected: boolean;
}

export interface BottomSectionProps {
  isLoading: boolean;
  user?: UserProfile;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavSectionProps {
  navItems: NavItem[];
}

export interface DownloadDropdownProps {
  downloadLinks: DownloadLink[];
}
