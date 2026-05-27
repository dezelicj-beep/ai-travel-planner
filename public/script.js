const form = document.getElementById("travelForm");
const result = document.getElementById("result");
const statusEl = document.getElementById("status");
const button = form.querySelector("button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  button.disabled = true;
  statusEl.textContent = "Generiranje...";
  result.textContent = "AI izrađuje personalizirani plan putovanja...";

  const payload = {
    destination: document.getElementById("destination").value.trim(),
    days: document.getElementById("days").value.trim(),
    budget: document.getElementById("budget").value.trim(),
    interests: document.getElementById("interests").value.trim(),
    travelStyle: document.getElementById("travelStyle").value
  };

  try {
    const response = await fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Greška pri generiranju plana.");
    }

    result.innerHTML = marked.parse(data.plan);
    statusEl.textContent = data.demo ? "Demo način rada" : "AI plan generiran";
  } catch (error) {
    result.innerHTML = error.message;
    statusEl.textContent = "Greška";
  } finally {
    button.disabled = false;
  }
});
