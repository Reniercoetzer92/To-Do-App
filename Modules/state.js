export const Task = {};

/**
 * @typedef {object} Filters - User configured filter values that control what tasks are shown.
 * @prop {string} search - A freeform string of characters that is matched against a task title.
 * @prop {Urgency | 'any'} urgency - Only shows tasks matching the value. `any` shows all tasks.
 * @prop {Sorting} sorting - Determines the order in which tasks are displayed.
 */

/**
 * @typedef {object} State - All data associated with the specific instance of the app
 * @prop {Record<string, Task>} tasks - A list of all tasks that have been created
 * @prop {Array<string>} displaying - `id` values of tasks that should be shown.
 * @prop {Filters} filters - An object containing the current filter state of tasks.
 */

/**
 * @type {State}
 */
export const state = {
  tasks: {},
  displaying: [],

  filters: {
    search: "",
    sorting: "recent",
    urgency: "any",
  },
};
