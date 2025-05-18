export interface MenuItem {
  title: string;
  icon?: string;
  link?: string;
  children?: MenuItem[];
  isOpen?: boolean;
  badge?: number;
  permissions?: string[];
  exact?: boolean; // Optional property to specify if the link should match exactly
}
