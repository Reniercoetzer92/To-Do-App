import { getHtml } from "./helpers.js";

/**
 * @typedef {'high' | 'medium' | 'low'} Urgency - The priority that the tasks
 * should take in terms of how quickly it should be completed
 *
 * **/

function createAddingHtml() {
  const element = getHtml({ dataAttr: "adding" });

  const button = document.createElement("button");
  button.dataset.add = undefined;
  button.className = "button";
  button.innerText = "Add Task";

  element.appendChild(button);

  const dialog = document.createElement("dialog");

  dialog.dataset.overlay = undefined;
  dialog.className = "overlay";

  dialog.innerHTML = /* html */ `
      <h2 class="overlay__title">Add Task</h2>
       
      <Form data-form id = "adding">
        <label class="overlay__field">
          <div>Title</div>
          <input required class="overlay__input" name="title" />
        </label>
      
        <label class="overlay__field">
          <div>Due</div>
          <input type="date" class="overlay__input" name="due" />
        </label>

        <label class="overlay__field">
          <div>Urgency</div>
          <select required class="overlay__input" name="urgency">
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>

        </label>

      </Form>

      <div class="overlay__row">
        <button class="button" data-cancel>Cancel</button>

        <button 
        class="button" 
        type ="submit" 
        form="adding"
        >Save</button>
      </div>
  `;

  element.appendChild(dialog);

  return {
    button,
    dialog,
    form: dialog.querySelector("[data-form]"),
    cancel: dialog.querySelector("[data-cancel]"),
  };
}

/**
 * @typedef {object} Data
 * @prop {string} title
 * @prop {Date | null} due
 * @prop {Urgency} urgency
 */

/**
 * @callback Submission
 * @param {Data} data
 */

/**
 * @typedef {object} Adding
 * @prop {Submission} submission
 */

/**
 * @returns {Adding}
 */

export const createAdding = () => {
  const { button, dialog, cancel, form } = createAddingHtml();

  const state = {
    submission: undefined,
  };

  button.addEventListener("click", () => {
    dialog.showModal();
  });

  cancel.addEventListener("click", () => {
    dialog.close();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (typeof state.submission !== "function") {
      throw new Error('"Submission" value has to be se as a function');
    }

    if (!(event.target instanceof HTMLFormElement)) {
      throw new Error("form not found");
    }

    const entries = new FormData(event.target);
    const response = Object.fromEntries(entries);
    state.submission(response);

    event.target.reset();
    dialog.close();
  });

  return {
    get submission() {
      return state.submission;
    },

    set submission(newValue) {
      state.submission = newValue;
    },
  };
};

export default createAdding;
