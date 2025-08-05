const API_BASE = "http://localhost:5000";

async function generateEmail() {
  const userInput = document.getElementById("prompt").value;
  const prompt = `Write a professional follow-up email that Include:${userInput}
- A personalized greeting
- A professional closing signature with name, phone, and email

The email should be concise, well-formatted, and sound human-written according to user input.
Keep the tone confident and polite. Format it like a real email.
`;

  if (!prompt) {
    showStatus("Please enter a prompt", "error");
    return;
  }

  showStatus("Generating email...");

  try {
    const res = await fetch(`${API_BASE}/generate-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data = await res.json();
    document.getElementById("emailBody").value = data.email;
    showStatus("Email generated!", "success");
  } catch (err) {
    showStatus("Error generating email: " + err.message, "error");
    console.error(err);
  }
}

async function sendEmail() {
  const recipients = document.getElementById("recipients").value;
  const subject = document.getElementById("subject").value;
  const body = document.getElementById("emailBody").value;

  if (!recipients || !subject || !body) {
    showStatus("Please fill all fields", "error");
    return;
  }

  showStatus("Sending email...");

  try {
    const res = await fetch(`${API_BASE}/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipients, subject, body }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const text = await res.text();
    showStatus(text, "success");
  } catch (err) {
    showStatus("Error sending email: " + err.message, "error");
    console.error(err);
  }
}

function showStatus(message, type = "info") {
  const statusElement = document.getElementById("status");
  statusElement.innerText = message;
  statusElement.className = type;
}