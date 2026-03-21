export const docUrl = (slug) => {
  const value = String(slug || "").replace(/^\/+|\/+$/g, "");
  if (!value || value === "index") return "/docs/";
  if (value.endsWith("/index")) return `/docs/${value.replace(/\/index$/, "/")}`;
  return `/docs/${value}/`;
};

export const flattenMenuSlugs = (menu) => {
  const out = [];

  const walk = (items) => {
    (items || []).forEach((item) => {
      if (typeof item === "string") {
        out.push(item);
        return;
      }

      if (item?.type === "submenu" && Array.isArray(item.items)) {
        walk(item.items);
      }
    });
  };

  (menu || []).forEach((group) => {
    if (group?.type !== "group") return;
    walk(group.items);
  });

  return out;
};

export const collectMenuSlugs = (menu) => {
  return [...new Set(flattenMenuSlugs(menu))];
};

export const fallbackLabelFromSlug = (slug) => {
  if (slug === "index") return "Introduction";
  const parts = String(slug).split("/");
  const last = parts.at(-1);
  const base = last === "index" && parts.length > 1 ? parts.at(-2) : last;
  return base.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};
