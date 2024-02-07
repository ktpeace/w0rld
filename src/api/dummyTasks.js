// id int AI PK
// name varchar(255)
// description text
// level int
// points int
// created_at timestamp
// creator_user_id int
// image_path varchar(255)
// status
const dummyTasks = [
  {
    id: 576,
    name: "Punch The Moon",
    description: "Just get out there and punch it!",
    level: 3,
    points: 27,
    created_at: "1/27/24 1:09",
    creator: "Kitty",
    creator_user_id: 1223,
    image_path:
      "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg",
    status: "active",
    groups: [{ id: 2, name: "U.A. Masters Course" }],
    participantCount: 123,
  },
  {
    id: 577,
    name: "Sing with the Stars",
    description: "Find a quiet place and sing under the starry night.",
    level: 2,
    points: 15,
    created_at: "1/28/24",
    creator: "Kitty",
    creator_user_id: 1224,
    image_path:
      "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg",
    status: "active",
    groups: [{ id: 2, name: "U.A. Masters Course" }],
    participantCount: 10000,
  },
  {
    id: 578,
    name: "Dance in the Rain",
    description: "Wait for a rainy day and dance in the rain for 10 minutes.",
    level: 1,
    points: 10,
    created_at: "2/1/24",
    creator: "Kitty",
    creator_user_id: 1225,
    image_path:
      "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg",
    status: "active",
    groups: [{ id: 2, name: "U.A. Masters Course" }],
    participantCount: 2,
  },
  {
    id: 579,
    name: "Master Origami",
    description: "Learn to make an origami crane and teach someone else.",
    level: 2,
    points: 20,
    created_at: "2/5/24",
    creator: "Kitty",
    creator_user_id: 1226,
    image_path:
      "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg",
    status: "active",
    groups: [{ id: 1, name: "University of Aesthematics" }],
    participantCount: 0,
  },
  {
    id: 580,
    name: "Midnight Snack Chef",
    description: "Prepare a creative midnight snack using only leftovers.",
    level: 3,
    points: 25,
    created_at: "2/10/24",
    creator: "Kitty",
    creator_user_id: 1227,
    image_path:
      "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg",
    status: "active",
    groups: [{ id: 2, name: "U.A. Masters Course" }],
    participantCount: 90,
  },
  {
    id: 581,
    name: "Stargazing Pro",
    description: "Identify and name five constellations.",
    level: 2,
    points: 18,
    created_at: "2/15/24",
    creator: "Kitty",
    creator_user_id: 1228,
    image_path:
      "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg",
    status: "active",
    groups: [{ id: 2, name: "U.A. Masters Course" }],
    participantCount: 45,
  },
  {
    id: 582,
    name: "Urban Explorer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur orcitum blah blah blah. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur orcitum blah blah blah.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur orcitum blah blah blah.",
    level: 3,
    points: 30,
    created_at: "2/20/24 13:39",
    creator: "Kitty",
    creator_user_id: 1229,
    image_path:
      "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg",
    status: "pretired",
    groups: [{ id: 1, name: "University of Aesthematics" }],
    participantCount: 100000,
  },
  {
    id: 583,
    name: "Nature's Friend",
    description: "Plant a tree and document its growth for a month.",
    level: 1,
    points: 12,
    created_at: "2/25/24",
    creator: "Kitty",
    creator_user_id: 1230,
    image_path:
      "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg",
    status: "active",
    groups: [{ id: 1, name: "University of Aesthematics" }],
    participantCount: 23,
  },
  {
    id: 584,
    name: "Bookworm Challenge",
    description: "Read a novel in one week and write a short review.",
    level: 2,
    points: 17,
    created_at: "3/1/24 16:24",
    creator: "Kitty",
    creator_user_id: 1231,
    image_path:
      "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg",
    status: "active",
    groups: [{ id: 2, name: "U.A. Masters Course" }],
    participantCount: 12,
  },
  {
    id: 585,
    name: "Culinary Artist",
    description: "Create a unique dish and host a small tasting party.",
    level: 3,
    points: 28,
    created_at: "3/5/24",
    creator: "Kitty",
    creator_user_id: 1232,
    image_path:
      "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg",
    status: "retired",
    groups: [{ id: 1, name: "University of Aesthematics" }],
  },
];

export default dummyTasks;
