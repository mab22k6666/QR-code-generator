// API: goqr.me

const input = document.getElementById("input");
const btn = document.getElementById("btn");
const mainImg = document.getElementById("main-Img");
const pasteBtn = document.getElementById("pastebtn");
const deleteBtn = document.getElementById("deletebtn");
const downloadBtn = document.getElementById("downloadBtn");

// Clear input
deleteBtn.addEventListener("click", () => {
  input.value = "";
  mainImg.innerHTML = "";
  downloadBtn.style.display = "none";
  input.focus();
});

// Paste from clipboard
pasteBtn.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    input.value = text;
    input.focus();
  } catch {
    alert("Failed to read clipboard. Please allow clipboard permission.");
  }
});

// Check for valid URL
function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

// Generate QR code
btn.addEventListener("click", () => {
  const userInput = input.value.trim();

  if (!userInput) {
    alert("Please enter a link");
    input.focus();
    return;
  }

  if (!isValidURL(userInput)) {
    alert("Please enter a valid URL");
    input.focus();
    return;
  }

  const qrURL =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(userInput);

  mainImg.innerHTML = "";
  const newimg = document.createElement("img");
  newimg.id = "img";
  newimg.src = qrURL;
  newimg.alt = "QR Code";
  newimg.style.marginTop = "10px";
  mainImg.appendChild(newimg);

  // Show and prepare download button
  downloadBtn.style.display = "inline-block";
  downloadBtn.setAttribute("data-url", qrURL);

  input.value = "";
});

// Download QR
downloadBtn.addEventListener("click", () => {
  const imageURL = downloadBtn.getAttribute("data-url");
  const a = document.createElement("a");
  window.open(imageURL, "-blank");

  // clear main page
  mainImg.innerHTML = "";
  downloadBtn.style.display = "none";

  //another way but not blank page

  //   a.href = imageURL;
  //   a.download = "qr-code.png";
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
});
