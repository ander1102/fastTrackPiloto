import { getRandomIndex } from "@app/common";
import { UserCard } from "@app/types/User";

const USER_BACKGROUND_COLORS = [
  "#C0392B",
  "#E74C3C",
  "#9B59B6",
  "#8E44AD",
  "#2980B9",
  "#3498DB",
  "#1ABC9C",
  "#27AE60",
  "#2ECC71",
  "#F1C40F",
  "#F39C12",
  "#E67E22",
  "#D35400",
  "#34495E",
  "#2C3E50",
];

export const getRandomUserColor = () =>
  USER_BACKGROUND_COLORS[getRandomIndex(USER_BACKGROUND_COLORS)];

export const DEFAULT_CARD_CONFIG: UserCard = {
  linked: false,
};
