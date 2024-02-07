// *Notifications can be marked as seen. Updates are for all
// Notifications: comment on your praxis/comment/task, friend/foe activity, friend/foe requests, maybe your group activity
// Updates: site announcements, random events, praxis posts, new tasks, new era, maybe level ups
const dummyUpdates = [
  {
    id: 576,
    timestamp: "",
    actingUserId: 2,
    elementType: "new-task",
    elementId: "",
    additionalInfo: {
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
  },
];

//  updateId: {
// //     type: DataTypes.INTEGER.UNSIGNED,
// //     autoIncrement: true,
// //     primaryKey: true,
// //   },
// //   timestamp: {
// //     type: DataTypes.DATE,
// //     allowNull: true,
// //     defaultValue: DataTypes.NOW,
// //   },
// //   actingUserId: {
// //     type: DataTypes.INTEGER,
// //     allowNull: true,
// //   },
// //   elementType: {
// //     type: new DataTypes.STRING(255),
// //     allowNull: true,
// //   },
// //   elementId: {
// //     type: DataTypes.INTEGER,
// //     allowNull: true,
// //   },
// //   additionalInfo: {
// //     type: DataTypes.JSON,
// //     allowNull: true,
// //   },
// // },
