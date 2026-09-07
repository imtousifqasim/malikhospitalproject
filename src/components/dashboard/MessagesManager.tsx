"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  Search,
  CheckCircle2,
  Clock,
  Eye,
  RefreshCw,
  Archive,
  Send,
  Trash2
} from "lucide-react";
import { ContactMessage, MessageStatus } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import ConfirmDeleteModal from "@/components/dashboard/ConfirmDeleteModal";

interface MessagesManagerProps {
  initialMessages?: ContactMessage[];
  role: "admin" | "staff";
  canDelete?: boolean;
}

export default function MessagesManager({
  initialMessages = [],
  role,
  canDelete = false,
}: MessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalMessage, setActiveModalMessage] = useState<ContactMessage | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Sync state whenever initialMessages updates from navigation
  React.useEffect(() => {
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  // Auto-fetch on mount so page changes immediately display fresh messages
  React.useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && !error) {
        setMessages(data as ContactMessage[]);
      }
    } catch (err) {
      console.error("Refresh messages error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: MessageStatus) => {
    setUpdatingId(id);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("contact_messages")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (!error) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg))
        );
        if (activeModalMessage && activeModalMessage.id === id) {
          setActiveModalMessage((prev) =>
            prev ? { ...prev, status: newStatus } : null
          );
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);

  const handleConfirmDeleteMessage = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      const res = await fetch(`/api/messages/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
        if (activeModalMessage?.id === deleteTarget.id) {
          setActiveModalMessage(null);
        }
        setDeleteTarget(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete message.");
      }
    } catch (err) {
      console.error("Delete message error:", err);
      alert("Error deleting message.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      if (statusFilter !== "all" && msg.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = msg.name.toLowerCase().includes(q);
        const matchEmail = (msg.email || "").toLowerCase().includes(q);
        const matchPhone = (msg.phone || "").toLowerCase().includes(q);
        const matchSubject = (msg.subject || "").toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone && !matchSubject) return false;
      }
      return true;
    });
  }, [messages, statusFilter, searchQuery]);

  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case "unread":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Unread</span>
          </span>
        );
      case "read":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <span>Read</span>
          </span>
        );
      case "replied":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            <CheckCircle2 className="w-3 h-3 text-teal-600" />
            <span>Replied</span>
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
            <span>Archived</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* FILTER BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sender, email, subject..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
          >
            <option value="all">All Inquiries</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-teal-600" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* MESSAGES TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-16 px-4">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No messages found</h3>
            <p className="text-xs text-slate-500 mt-1">
              No inquiries submitted from the website contact page match your current filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Sender</th>
                  <th className="py-3.5 px-4">Subject & Message Preview</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      msg.status === "unread" ? "bg-amber-50/30 font-semibold" : ""
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {msg.name}
                      </div>
                      {msg.department && (
                        <span className="text-[11px] text-teal-700 block">
                          Dept: {msg.department}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 truncate">
                        {msg.subject || "General Inquiry"}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">
                        {msg.message}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {msg.phone && (
                        <a href={`tel:${msg.phone}`} className="font-mono text-xs text-[#0B3D91] hover:underline block">
                          {msg.phone}
                        </a>
                      )}
                      {msg.email && (
                        <a href={`mailto:${msg.email}`} className="text-[11px] text-slate-500 hover:underline block truncate max-w-[150px]">
                          {msg.email}
                        </a>
                      )}
                    </td>

                    <td className="py-3 px-4 text-[11px] text-slate-500">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4">
                      {getStatusBadge(msg.status)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {msg.status === "unread" && (
                          <button
                            onClick={() => handleStatusUpdate(msg.id, "read")}
                            disabled={updatingId === msg.id}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-[11px] cursor-pointer"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setActiveModalMessage(msg);
                            if (msg.status === "unread") {
                              handleStatusUpdate(msg.id, "read");
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          title="View Message"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {(role === "admin" || canDelete) && (
                          <button
                            onClick={() => setDeleteTarget(msg)}
                            disabled={deletingId === msg.id}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="Delete Message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MESSAGE DETAILS MODAL */}
      {activeModalMessage && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  {activeModalMessage.subject || "Inquiry"}
                </span>
                <h3 className="text-lg font-black text-[#0B3D91] mt-1.5">
                  {activeModalMessage.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalMessage(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Phone</span>
                <a href={`tel:${activeModalMessage.phone}`} className="font-bold text-slate-900">
                  {activeModalMessage.phone || "Not provided"}
                </a>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Email</span>
                <a href={`mailto:${activeModalMessage.email}`} className="font-bold text-slate-900 break-all">
                  {activeModalMessage.email || "Not provided"}
                </a>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Inquiry Message
              </span>
              <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                {activeModalMessage.message}
              </p>
            </div>

            {/* Status change buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Mark as:</span>
              <button
                onClick={() => handleStatusUpdate(activeModalMessage.id, "replied")}
                className="px-3 py-1 text-xs font-bold rounded-lg bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 cursor-pointer"
              >
                Replied
              </button>
              <button
                onClick={() => handleStatusUpdate(activeModalMessage.id, "archived")}
                className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                Archived
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {(role === "admin" || canDelete) ? (
                <button
                  type="button"
                  onClick={() => setDeleteTarget(activeModalMessage)}
                  disabled={deletingId === activeModalMessage.id}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Inquiry</span>
                </button>
              ) : <div />}

              <button
                onClick={() => setActiveModalMessage(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODERN DELETE CONFIRMATION MODAL */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => {
          if (!deletingId) setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDeleteMessage}
        title="Confirm Permanent Deletion"
        itemName={deleteTarget ? `inquiry from "${deleteTarget.name}" (${deleteTarget.subject || "General Inquiry"})` : undefined}
        loading={!!deletingId}
      />
    </div>
  );
}
