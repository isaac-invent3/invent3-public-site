export type Comment = {
  id: string;
  userName: string;
  text: string;
  timestamp: string;
  replies?: Comment[];
  mentions?: string[];
};

export const comments: Comment[] = [
  {
    id: '101',
    userName: 'George Washington',
    text: 'Pizza ipsum dolor meat lovers buffalo. Dolor pork Bianca extra tomatoes. Steak lovers roll mouth parmesan.',
    timestamp: new Date(
      new Date().getTime() - 3 * 60 * 60 * 1000
    ).toISOString(), // 3 hours ago
    replies: [
      {
        id: '102',
        userName: 'Jerome Bell',
        text: 'Pizza ipsum dolor meat lovers buffalo. Dolor pork Bianca extra tomatoes. Steak lovers roll mouth @George Washington',
        timestamp: new Date(
          new Date().getTime() - 2 * 60 * 60 * 1000
        ).toISOString(), // 2 hours ago
        mentions: ['1'],
      },
      {
        id: '103',
        userName: 'George Washington',
        text: 'Pizza ipsum dolor meat lovers buffalo. Dolor pork Bianca extra tomatoes. Steak lovers roll mouth parmesan.',
        timestamp: new Date(
          new Date().getTime() - 1 * 60 * 60 * 1000
        ).toISOString(), // 1 hour ago
        replies: [],
      },
    ],
  },
  {
    id: '104',
    userName: 'Jerome Bell',
    text: 'Pizza ipsum dolor meat lovers buffalo. Dolor pork Bianca extra tomatoes. Steak lovers roll mouth parmesan.',
    timestamp: new Date(
      new Date().getTime() - 2 * 60 * 60 * 1000
    ).toISOString(),
  },
  {
    id: '102',
    userName: 'George Washington',
    text: 'Pizza ipsum dolor meat lovers buffalo. Dolor pork Bianca extra tomatoes. Steak lovers roll mouth @George Washington',
    timestamp: new Date(
      new Date().getTime() - 2 * 60 * 60 * 1000
    ).toISOString(),
  },
];
