export function orderIdToSlug(id: string): string {
  return id.replace(/^#/, "");
}

export function slugToOrderId(slug: string): string {
  return slug.startsWith("#") ? slug : `#${slug}`;
}
