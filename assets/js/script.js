// Fetch all inputs
const inputs = document.querySelectorAll(
  "#message, #type, #theme, #position, #autoClose, #transition, #icon, #color, #font, #progressPercent, #hideProgressBar, #closeAble, #closeOnClick, #pauseOnHover"
);

const generatedCodeElement = document.getElementById("generatedCode");
const copyButton = document.getElementById("copyCodeButton");
const showButton = document.getElementById("showToastButton");

const defaultIcons = {
  none: '<i class="fa-solid fa-circle-info"></i>',
  success: '<i class="fa-solid fa-circle-check"></i>',
  error: '<i class="fa-solid fa-circle-exclamation"></i>',
  info: '<i class="fa-solid fa-circle-info"></i>',
  warn: '<i class="fa-solid fa-triangle-exclamation"></i>',
  promise: '<i class="fa-solid fa-spinner fa-spin"></i>'
};

const defaultMessage = {
  none: "This is a Toast.",
  success: "Successfully completed!",
  error: "Something went wrong!",
  info: "Here is some information for you.",
  warn: "Please be cautious!",
  promise: "Loading..."
};

// Function to escape HTML characters for safe display
function escapeHTML(html) {
  const div = document.createElement("div");
  div.innerText = html;
  return div.innerHTML;
}

// Function to generate the code preview
function generateToastCode(options) {
    // Conditionally set the `type` method
    const toastType = options.type !== "none" ? `.<span class="type">${options.type}</span>` : "";
  return `
<span class="keyword">showToast</span><span>${toastType}</span>({
    <span class="property">theme</span>: "<span class="string">${options.theme}</span>",
    <span class="property">position</span>: "<span class="string">${options.position}</span>",
    <span class="property">transition</span>: "<span class="string">${options.transition}</span>",
    <span class="property">autoClose</span>: <span class="number">${options.autoClose}</span>,
    <span class="property">hideProgressBar</span>: <span class="keyword">${options.hideProgressBar}</span>,
    <span class="property">pauseOnHover</span>: <span class="keyword">${options.pauseOnHover}</span>,
    <span class="property">closeAble</span>: <span class="keyword">${options.closeAble}</span>,
    <span class="property">closeOnClick</span>: <span class="keyword">${options.closeOnClick}</span>,
    <span class="property">icon</span>: \`<span class="string">${escapeHTML(options.icon)}</span>\`,
    <span class="property">color</span>: "<span class="string">${options.color}</span>",
    <span class="property">font</span>: \`<span class="string">${options.font}</span>\`,
    <span class="property">message</span>: "<span class="string">${options.message}</span>",
    <span class="property">progressPercent</span>: <span class="number">${options.progressPercent}</span>
});`;
}

// Function to fetch current options from input fields
function getCurrentOptions() {
  type = document.getElementById("type").value
  return {
    type,
    theme: document.getElementById("theme").value,
    position: document.getElementById("position").value,
    autoClose:
      document.getElementById("autoClose").value === "none"
        ? "none"
        : parseInt(document.getElementById("autoClose").value, 10) || 5000,
    hideProgressBar: document.getElementById("hideProgressBar").checked,
    transition: document.getElementById("transition").value,
    closeAble: document.getElementById("closeAble").checked,
    closeOnClick: document.getElementById("closeOnClick").checked,
    pauseOnHover: document.getElementById("pauseOnHover").checked,
    icon: document.getElementById("icon").value || defaultIcons[type],
    color: document.getElementById("color").value || "",
    message:
      document.getElementById("message").value || defaultMessage[type],
    progressPercent:
      parseInt(document.getElementById("progressPercent").value, 10) || 100,
    font: document.getElementById("font").value || "",
  };
}

// Function to update the generated code preview
function updateGeneratedCode() {
  const options = getCurrentOptions();
  generatedCodeElement.innerHTML = generateToastCode(options).trim();
  return options;
}

// Add event listeners to update the preview whenever inputs change
inputs.forEach((input) => {
  input.addEventListener("input", updateGeneratedCode);
});

// Initialize with default values
updateGeneratedCode();

// Event listener for the "Show Toast" button
showButton.addEventListener("click", () => {
  const options = getCurrentOptions();
  const type = options.type;

  if (typeof showToast[type] === "function") {
    showToast[type](options); // Dynamically invoke the toast function
  } else {
    alert(`Invalid toast type: ${type}`);
  }
});


copyButton.addEventListener("click", () => {
  const tempElement = document.createElement("textarea");
  tempElement.value = generatedCodeElement.innerText;
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand("copy");
  document.body.removeChild(tempElement);

  copyButton.innerText = "Copied!";
  setTimeout(() => {
    copyButton.innerText = "Copy";
  }, 2000);
});

let titleText =
  "Toastify Playground || Make your toast easily || Developed by NOSIB BISWAS || ";
let index = 0;

// Function to scroll the title smoothly
function scrollTitle() {
  document.title = titleText.substring(index) + titleText.substring(0, index);
  index = (index + 1) % titleText.length;
  requestAnimationFrame(() => setTimeout(scrollTitle, 180)); // Adjust time for smoothness
}

scrollTitle();




// Example promise
const examplePromise = (() => {
  let toggle = true; // Start with `true`

  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        toggle ? resolve(true) : reject(false);
        toggle = !toggle; // Flip the toggle
      }, 5000); // Delay for better visualization
    });
})();

const promiseButton = document.getElementById("showPromiseButton");
promiseButton.addEventListener("click", () => {
  showToast.promise({
    theme: "light",
    position: "top-right",
    transition: "zoom",
    autoClose: 5000,
    hideProgressBar: false,
    pauseOnHover: true,
    closeAble: true,
    closeOnClick: false,
    icon: `<i class="fa-solid fa-spinner fa-spin"></i>`,
    color: "",
    font: ``,
    message: "Loading...",
    progressPercent: 100
});
});
