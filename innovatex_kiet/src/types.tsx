export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  isBottom: boolean;
};
export type FeedItem = {
  id: string;
  title: string;
  author: string;
  content: string;
  image?: string;
  upvotes: string[];
  isUpvoted: boolean;
  isSaved: boolean;
  time: string;
}

export type LeaderboardData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export type Post ={
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

