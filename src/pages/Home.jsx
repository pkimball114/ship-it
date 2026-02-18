import { useEffect, useMemo, useState } from "react";
import { loadItems, saveItems } from "../storage";

const empty = { title: "", description: "", tag: "" };

export default function Home() {
  const [form, setForm] = useState(empty);
  const [items, setItems] = useState(() => loadItems());

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const canSubmit = useMemo(() => form.title.trim().length > 0, [form.title]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    const newItem = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      tag: form.tag.trim(),
    };

    setItems((prev) => [newItem, ...prev]);
    setForm(empty);
  }

  function remove(id) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function clearAll() {
    if (items.length && confirm("Clear all items?")) setItems([]);
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 16 }}>
      <h1>Ship It</h1>
      <p>Quick capture list (saved to localStorage).</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        <input
          name="title"
          placeholder="Title (required)"
          value={form.title}
          onChange={onChange}
        />
        <input
          name="tag"
          placeholder="Tag (optional) e.g. idea, bug, chore"
          value={form.tag}
          onChange={onChange}
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          rows={4}
          value={form.description}
          onChange={onChange}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" disabled={!canSubmit}>
            Add
          </button>
          <button type="button" onClick={clearAll} disabled={!items.length}>
            Clear all
          </button>
        </div>
      </form>

      <div style={{ display: "grid", gap: 8 }}>
        {items.length === 0 ? (
          <div style={{ opacity: 0.7 }}>No items yet.</div>
        ) : (
          items.map((x) => (
            <div
              key={x.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{x.title}</div>
                  {(x.tag || x.createdAt) && (
                    <div style={{ fontSize: 12, opacity: 0.7 }}>
                      {x.tag ? `#${x.tag}` : ""}{" "}
                      {x.createdAt ? `• ${new Date(x.createdAt).toLocaleString()}` : ""}
                    </div>
                  )}
                </div>
                <button onClick={() => remove(x.id)}>Remove</button>
              </div>

              {x.description && <div style={{ marginTop: 8 }}>{x.description}</div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
