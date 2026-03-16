"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./events.module.css";

interface Event {
  _id: string;
  day: number;
  month: string;
  year: number;
  venue: string;
  city: string;
  country: string;
  piece: string;
  ticketUrl?: string;
}

const EMPTY_FORM = {
  day: "",
  month: "",
  year: "",
  venue: "",
  city: "",
  country: "",
  piece: "",
  ticketUrl: "",
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function fetchEvents() {
    const res = await fetch("/api/admin/events", { credentials: "include" });
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setEvents(data.events ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreate() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setError("");
    setModalOpen(true);
  }

  function openEdit(ev: Event) {
    setEditId(ev._id);
    setForm({
      day: String(ev.day),
      month: ev.month,
      year: String(ev.year),
      venue: ev.venue,
      city: ev.city,
      country: ev.country ?? "",
      piece: ev.piece ?? "",
      ticketUrl: ev.ticketUrl ?? "",
    });
    setError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditId(null);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      day: Number(form.day),
      month: form.month,
      year: Number(form.year),
      venue: form.venue,
      city: form.city,
      country: form.country,
      piece: form.piece,
      ticketUrl: form.ticketUrl,
    };

    try {
      const url = editId ? `/api/admin/events/${editId}` : "/api/admin/events";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        setError(data.error ?? "Failed to save");
        return;
      }
      closeModal();
      fetchEvents();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      setDeleteId(null);
      fetchEvents();
    } catch {
      setDeleteId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/admin/login");
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.logo}>SG</span>
          <h1 className={styles.title}>Concert Events</h1>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.btnPrimary} onClick={openCreate}>
            + New Event
          </button>
          <button className={styles.btnGhost} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {loading ? (
          <p className={styles.empty}>Loading…</p>
        ) : events.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No events yet</p>
            <p className={styles.emptyHint}>
              Click &ldquo;+ New Event&rdquo; to add the first concert.
            </p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Piece</th>
                  <th>Ticket</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev._id}>
                    <td className={styles.dateCell}>
                      {ev.day} {ev.month} {ev.year}
                    </td>
                    <td>{ev.venue}</td>
                    <td>{ev.city}</td>
                    <td>{ev.country}</td>
                    <td className={styles.pieceCell}>{ev.piece}</td>
                    <td>
                      {ev.ticketUrl ? (
                        <a
                          href={ev.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.ticketLink}
                        >
                          Link
                        </a>
                      ) : (
                        <span className={styles.none}>—</span>
                      )}
                    </td>
                    <td className={styles.actions}>
                      <button
                        className={styles.btnEdit}
                        onClick={() => openEdit(ev)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.btnDelete}
                        onClick={() => setDeleteId(ev._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Event form modal */}
      {modalOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>
              {editId ? "Edit Event" : "New Event"}
            </h2>

            <form onSubmit={handleSave} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Day</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    className={styles.input}
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Month</label>
                  <select
                    className={styles.input}
                    value={form.month}
                    onChange={(e) => setForm({ ...form, month: e.target.value })}
                    required
                  >
                    <option value="">Select</option>
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Year</label>
                  <input
                    type="number"
                    min={2024}
                    max={2099}
                    className={styles.input}
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={`${styles.field} ${styles.grow}`}>
                  <label className={styles.label}>Venue *</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    required
                  />
                </div>
                <div className={`${styles.field} ${styles.grow}`}>
                  <label className={styles.label}>City *</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Country</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={form.country}
                    onChange={(e) =>
                      setForm({ ...form, country: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Piece / Programme</label>
                <input
                  type="text"
                  className={styles.input}
                  value={form.piece}
                  onChange={(e) => setForm({ ...form, piece: e.target.value })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Ticket URL (optional)</label>
                <input
                  type="url"
                  className={styles.input}
                  placeholder="https://…"
                  value={form.ticketUrl}
                  onChange={(e) =>
                    setForm({ ...form, ticketUrl: e.target.value })
                  }
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.btnGhost}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.btnPrimary}
                  disabled={saving}
                >
                  {saving ? "Saving…" : editId ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className={styles.overlay} onClick={() => setDeleteId(null)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>Delete Event?</h2>
            <p className={styles.deleteMsg}>
              This action cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.btnGhost}
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className={styles.btnDeleteConfirm}
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
