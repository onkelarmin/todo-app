export type PageKey = "home";

export interface PageData {
  key: PageKey;
  name: string;
  url: string;
  title: string;
  description: string;
  ogImage: string;
}

export const sitePages: Record<PageKey, PageData> = {
  home: {
    key: "home",
    name: "Home",
    url: "/",
    title: "Todo App – Responsive Task Manager with Drag & Drop",
    description:
      "A responsive todo app with task creation, filtering (all, active, completed), drag-and-drop reordering, and light/dark mode support.",
    ogImage: "og/home.jpg",
  },
};
