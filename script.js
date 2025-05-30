const video = document.getElementById('video');
let model;

// Load the MobileNet model
async function loadModel() {
  model = await mobilenet.load();
  console.log("✅ Model loaded successfully.");
}

// Start the webcam
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (error) {
    console.error("🚫 Error accessing webcam:", error);
    alert("Webcam access is required to use this app.");
  }
}

// Classify the image from webcam
async function classifyImage() {
  if (!model) {
    alert("Model is not loaded yet. Please wait.");
    return;
  }

  const predictions = await model.classify(video);
  const result = predictions[0].className;

  // Map to waste categories
  let category = "Unknown";
  if (result.includes("plastic") || result.includes("bottle")) {
    category = "♻️ Recyclable Plastic";
  } else if (result.includes("banana") || result.includes("apple") || result.includes("food")) {
    category = "🌱 Compostable";
  } else if (result.includes("paper") || result.includes("book")) {
    category = "📄 Recyclable Paper";
  } else if (result.includes("metal") || result.includes("can")) {
    category = "🥫 Recyclable Metal";
  } else if (result.includes("shoe") || result.includes("bag")) {
    category = "🚮 Landfill";
  }

  document.getElementById("result").innerText = `🧠 Detected: ${result} → Category: ${category}`;
}

// Load model and start camera on page load
window.addEventListener('load', () => {
  loadModel();
  startCamera();
});
