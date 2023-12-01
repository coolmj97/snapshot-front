export interface ProfileProps {
  url: string;
  name: string;
  date?: string;
  onlyImg?: boolean;
  onClick?: () => void;
}
