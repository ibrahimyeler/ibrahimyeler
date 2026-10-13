export type Category = "All" | "Web" | "Mobile" | "SaaS";
export type Project = {
  name: string;
  image: string;
  tags: Category[];
  icon: "building" | "heart" | "cart" | "chess";
  description: string;
  features: string[];
  color: string;
};
