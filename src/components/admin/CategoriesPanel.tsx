"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AdminCategory } from "@/data/shop-categories";

export function CategoriesPanel() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/categories");
      const data = (await res.json()) as {
        categories?: AdminCategory[];
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Failed to load categories.");
        return;
      }

      setCategories(data.categories ?? []);
    } catch {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to create category.");
        return;
      }

      setSuccess(data.message ?? "Category created.");
      setNewName("");
      setShowAddForm(false);
      await loadCategories();
    } catch {
      setError("Failed to create category.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(category: AdminCategory) {
    setEditingId(category.id);
    setEditName(category.name);
    setError("");
    setSuccess("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;

    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const res = await fetch(`/api/admin/categories/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName }),
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to update category.");
        return;
      }

      setSuccess(data.message ?? "Category updated.");
      cancelEdit();
      await loadCategories();
    } catch {
      setError("Failed to update category.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string, name: string, productCount: number) {
    if (productCount > 0) {
      setError(
        `Cannot delete "${name}" while ${productCount} product(s) use it. Reassign or remove those products first.`
      );
      return;
    }

    if (!window.confirm(`Delete category "${name}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setError(data.error ?? "Failed to delete category.");
        return;
      }

      setSuccess(data.message ?? "Category deleted.");
      if (editingId === id) {
        cancelEdit();
      }
      await loadCategories();
    } catch {
      setError("Failed to delete category.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <p className="text-sm text-coral" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-forest" role="status">
          {success}
        </p>
      )}

      {showAddForm && (
        <div className="bg-white rounded-xl border border-border shadow-sm p-5 md:p-6">
          <h3 className="text-base font-bold text-foreground mb-4">
            Add category
          </h3>
          <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              minLength={2}
              placeholder="e.g. Skin Care"
              className="h-11 rounded-lg flex-1"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 text-sm font-semibold px-8"
            >
              {submitting ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => {
                setShowAddForm(false);
                setNewName("");
              }}
              className="rounded-lg h-11 text-sm"
            >
              Cancel
            </Button>
          </form>
        </div>
      )}

      {editingId && (
        <div className="bg-white rounded-xl border border-forest/30 shadow-sm p-5 md:p-6">
          <h3 className="text-base font-bold text-foreground mb-4">
            Edit category
          </h3>
          <form onSubmit={handleEdit} className="flex flex-col sm:flex-row gap-3">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
              minLength={2}
              className="h-11 rounded-lg flex-1"
            />
            <Button
              type="submit"
              disabled={submitting}
              className="bg-forest hover:bg-forest-dark text-white rounded-lg h-11 text-sm font-semibold px-8"
            >
              {submitting ? "Saving..." : "Update"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={cancelEdit}
              className="rounded-lg h-11 text-sm"
            >
              Cancel
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-3">
            Renaming updates all products currently assigned to this category.
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-base font-bold text-foreground">Categories</h2>
            <p className="text-sm text-muted-foreground">
              Manage product categories used across the store
            </p>
          </div>
          {!showAddForm && !editingId && (
            <button
              type="button"
              onClick={() => {
                setShowAddForm(true);
                setError("");
                setSuccess("");
              }}
              className="text-sm bg-forest hover:bg-forest-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add Category
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="bg-light-gray text-left">
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Name
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Products
                </th>
                <th className="text-xs font-semibold text-muted-foreground px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-8 text-sm text-muted-foreground text-center"
                  >
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-8 text-sm text-muted-foreground text-center"
                  >
                    No categories yet. Add your first category above.
                  </td>
                </tr>
              ) : (
                categories.map((category) => {
                  const isDeleting = deletingId === category.id;

                  return (
                    <tr
                      key={category.id}
                      className="border-t border-border hover:bg-light-gray/50 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium text-foreground">
                        {category.name}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">
                        {category.productCount}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={isDeleting || submitting}
                            onClick={() => startEdit(category)}
                            className="text-xs text-forest font-medium hover:underline disabled:opacity-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            disabled={isDeleting || submitting}
                            onClick={() =>
                              void handleDelete(
                                category.id,
                                category.name,
                                category.productCount
                              )
                            }
                            className="text-xs text-coral font-medium hover:underline disabled:opacity-50"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
