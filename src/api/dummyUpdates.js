// *Notifications can be marked as seen. Updates are for all
// Notifications: comment on your praxis/comment/task, friend/foe activity, friend/foe requests, maybe your group activity
// Updates: site announcements, random events, praxis posts, new tasks, new era, maybe level ups

//  updateId: {
//     type: DataTypes.INTEGER.UNSIGNED,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   timestamp: {
//     type: DataTypes.DATE,
//     allowNull: true,
//     defaultValue: DataTypes.NOW,
//   },
//   actingUserId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   elementType: {
//     type: new DataTypes.STRING(255),
//     allowNull: true,
//   },
//   elementId: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   additionalInfo: {
//     type: DataTypes.JSON,
//     allowNull: true,
//   },
// },

const dummyUpdates = [
  {
    id: 123,
    timestamp: "",
    actingUserId: 2,
    elementType: "new-task",
    elementId: "112",
    additionalInfo: {
      id: 101,
      name: "Task 10",
      description: "Description for task 10",
      level: 7,
      points: 49,
      createdAt: "2023-04-29T23:04:31.000Z",
      creatorUserId: undefined,
      status: "active",
      participantsCount: 1,
      groups: [
        {
          id: 2,
          name: "U.A. Masters Course",
        },
        {
          id: 6,
          name: "Gestalt",
        },
        {
          id: 1,
          name: "University of Aesthematics",
        },
      ],
    },
  },
  {
    id: 576,
    timestamp: "",
    actingUserId: 2,
    elementType: "praxis-post",
    elementId: "112",
    additionalInfo: {
      id: 26,
      taskId: 153,
      userId: 44,
      completedAt: "2023-07-09T18:54:58.000Z",
      title: "Mastering a Musical Instrument",
      description:
        "I dedicated years to mastering a musical instrument, honing my skills and performing breathtaking musical compositions.",
      User: {
        username: "ArtisticSoul",
        imagePath: null,
      },
      Task: {
        name: "Task 3-5",
        points: 4,
        level: 3,
      },
    },
  },
];

export default dummyUpdates;
