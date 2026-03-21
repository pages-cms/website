import { docUrl, fallbackLabelFromSlug, flattenMenuSlugs } from "./menu.js";

export const registerNavigationFilters = (eleventyConfig, lucideIcons) => {
  const lucideSvg = (iconName) => {
    if (!iconName) return null;
    const pascalName = iconName
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
    const iconComponent = lucideIcons?.[pascalName];
    if (!iconComponent) return null;
    return iconComponent.replace(
      'class="lucide',
      `class="lucide lucide-${iconName}`,
    );
  };

  const resolveIcon = (icon) => {
    if (!icon) return null;
    if (typeof icon !== "string") return icon;
    const trimmed = icon.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("<svg")) return trimmed;
    return lucideSvg(trimmed) || null;
  };

  const normalizeUrl = (url) => {
    if (!url) return "/";
    if (url === "/") return "/";
    return String(url).endsWith("/") ? String(url) : `${url}/`;
  };

  const isExternalUrl = (url) => /^https?:\/\//i.test(String(url || ""));
  const isCurrentUrl = (url, currentUrl) =>
    normalizeUrl(url) === normalizeUrl(currentUrl);

  const buildCommandItem = ({ label, description, iconSvg, url, isExternal }) => {
    const keywords = [label, description].filter(Boolean).join(" ");
    const iconHtml = iconSvg ? iconSvg : "";
    const urlJs = JSON.stringify(url);

    return {
      type: "item",
      label,
      content: `${iconHtml}<span>${label}</span>`,
      keywords,
      attrs: isExternal
        ? {
            onclick: `window.open(${urlJs}, '_blank', 'noopener'); this.closest('dialog')?.close();`,
          }
        : {
            onclick: `window.location.href=${urlJs}; this.closest('dialog')?.close();`,
          },
    };
  };

  const buildMenus = (menu, collections, currentUrl) => {
    const docs = collections?.docs || [];
    const docsByUrl = new Map(docs.map((doc) => [doc.url, doc]));

    const hasCurrentDescendant = (entry) => {
      if (!entry) return false;
      if (entry.current) return true;
      if (!Array.isArray(entry.items)) return false;
      return entry.items.some((child) => hasCurrentDescendant(child));
    };

    const processSlug = (slug) => {
      const url = docUrl(slug);
      const doc = docsByUrl.get(url);
      const title = doc?.data?.title
        ? String(doc.data.title)
        : fallbackLabelFromSlug(slug);
      const description = doc?.data?.description
        ? String(doc.data.description)
        : "";
      const iconSvg = resolveIcon(doc?.data?.icon) || null;

      return {
        sidebar: {
          icon: iconSvg,
          url,
          current: isCurrentUrl(url, currentUrl),
          label: title,
          description,
        },
        command: buildCommandItem({
          label: title,
          description,
          iconSvg,
          url,
          isExternal: false,
        }),
      };
    };

    const processItem = (item) => {
      if (typeof item === "string") return processSlug(item);

      if (item?.type === "item" && item.url && item.label) {
        const url = String(item.url);
        const label = String(item.label);
        const description = item.description ? String(item.description) : "";
        const iconSvg = resolveIcon(item.icon) || null;
        const isExternal = isExternalUrl(url);
        const attrs = item.attrs && typeof item.attrs === "object" ? item.attrs : {};

        return {
          sidebar: {
            icon: iconSvg,
            url,
            current: !isExternal && isCurrentUrl(url, currentUrl),
            label,
            description,
            attrs,
          },
          command: buildCommandItem({
            label,
            description,
            iconSvg,
            url,
            isExternal,
          }),
        };
      }

      if (item?.type === "submenu") {
        const processedItems = (item.items || []).map((sub) => processItem(sub));
        const sidebarItems = processedItems
          .map((sub) => sub.sidebar)
          .filter(Boolean);
        const commandItems = processedItems
          .map((sub) => sub.command)
          .filter(Boolean);

        return {
          sidebar: {
            ...item,
            icon: resolveIcon(item.icon) || null,
            open:
              item.open === true ||
              sidebarItems.some((sub) => hasCurrentDescendant(sub)),
            items: sidebarItems,
          },
          command: { type: "group", label: item.label, items: commandItems },
        };
      }

      return { sidebar: null, command: null };
    };

    const processedGroups = (menu || []).map((group) => {
      if (group?.type !== "group") return { sidebar: group, command: group };

      const processedItems = (group.items || []).map((item) => processItem(item));

      return {
        sidebar: {
          ...group,
          items: processedItems.map((item) => item.sidebar).filter(Boolean),
        },
        command: {
          type: "group",
          label: group.label,
          items: processedItems.map((item) => item.command).filter(Boolean),
        },
      };
    });

    return {
      sidebar: processedGroups.map((group) => group.sidebar),
      command: processedGroups.map((group) => group.command),
    };
  };

  eleventyConfig.addFilter(
    "getNavigation",
    function getNavigation(menu, collections) {
      const flattened = flattenMenuSlugs(menu);
      const currentUrl = this.page.url;
      const index = flattened.findIndex((slug) => docUrl(slug) === currentUrl);
      if (index === -1) return { prev: null, next: null };

      const labelFor = (slug) => {
        const url = docUrl(slug);
        const doc = collections?.docs?.find((entry) => entry.url === url);
        if (doc?.data?.title) return String(doc.data.title);
        return fallbackLabelFromSlug(slug);
      };

      return {
        prev:
          index > 0
            ? {
                url: docUrl(flattened[index - 1]),
                label: labelFor(flattened[index - 1]),
              }
            : null,
        next:
          index < flattened.length - 1
            ? {
                url: docUrl(flattened[index + 1]),
                label: labelFor(flattened[index + 1]),
              }
            : null,
      };
    },
  );

  eleventyConfig.addFilter(
    "sidebarMenu",
    function sidebarMenu(menu, collections) {
      const currentUrl = this?.page?.url || this?.ctx?.page?.url || "/";
      return buildMenus(menu, collections, currentUrl).sidebar;
    },
  );

  eleventyConfig.addFilter(
    "commandMenu",
    function commandMenu(menu, collections) {
      return buildMenus(menu, collections).command;
    },
  );
};
