const listDetails = {
  id: 1,
  title: "List 1",
  note: "List 1 note",
};

const allTasks = [
  {
    id: 1,
    title: "task 1",
    details: "task 1 details",
    scheduled_at: null,
    status: 1,
  },
  {
    id: 2,
    title: "task 2",
    details: "task 2 details",
    scheduled_at: null,
    status: 1,
  },
  {
    id: 3,
    title: "task 3",
    details: "task 3 details",
    scheduled_at: null,
    status: 0,
  },
];

const completedTask = {
  id: 1,
  title: "task 1",
  details: "task 1 details",
  scheduled_at: null,
  status: 1,
};

const pendingTask = {
  id: 3,
  title: "task 3",
  details: "task 3 details",
  scheduled_at: null,
  status: 0,
};

const getAllListAPIMockResponse = {
  code: "200",
  message: "",
  resultObj: [
    {
      id: 1,
      title: "test list 1",
      note: "test list 1",
    },
    {
      id: 2,
      title: "test list 2",
      note: "test list 2",
    },
  ],
};

export {
  listDetails,
  allTasks,
  completedTask,
  pendingTask,
  getAllListAPIMockResponse,
};
