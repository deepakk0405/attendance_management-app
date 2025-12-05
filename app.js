document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("attendance-form");
  const listBody = document.getElementById("attendance-body");
  const totalCountEl = document.getElementById("total-count");
  const refreshBtn = document.getElementById("refresh");

  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const captureBtn = document.getElementById("capture");
  const toastEl = document.getElementById("toast");

  // ✅ Local memory only (clears on refresh)
  let localAttendance = [];

  // ---------- Toast helper ----------
  function showToast(message, type = "success") {
    toastEl.textContent = message;
    toastEl.className = `toast show ${type}`;
    setTimeout(() => {
      toastEl.className = "toast";
    }, 2500);
  }

  // ---------- Render helper ----------
  function renderAttendance() {
    listBody.innerHTML = "";

    localAttendance.forEach((student, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${student.name}</td>
        <td>${student.date}</td>
        <td>
          <span class="badge ${
            student.type === "face" ? "badge-face" : "badge-manual"
          }">
            ${student.type === "face" ? "Face" : "Manual"}
          </span>
        </td>
      `;

      listBody.appendChild(tr);
    });

    totalCountEl.textContent = `Total: ${localAttendance.length}`;
  }

  // ✅ Initial empty render (nothing loads after refresh)
  renderAttendance();

  // ---------- Manual Attendance ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("studentName");
    const name = nameInput.value.trim();
    if (!name) return;

    const entry = {
      name,
      date: new Date().toLocaleString(),
      type: "manual"
    };

    // ✅ Add instantly to list
    localAttendance.push(entry);
    renderAttendance();

    showToast(`Attendance marked for ${name}`, "success");
    nameInput.value = "";
  });

  // ---------- Refresh Button (Clear Everything) ✅ ----------
  refreshBtn.addEventListener("click", () => {
    if (!confirm("This will clear all attendance. Continue?")) return;
    localAttendance = [];
    renderAttendance();
    showToast("All attendance cleared", "success");
  });

  // ---------- Webcam / Face Attendance ----------
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
    });
  }

  captureBtn.addEventListener("click", () => {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const studentName = prompt("Enter student name:");
    if (!studentName) return;

    const entry = {
      name: studentName.trim(),
      date: new Date().toLocaleString(),
      type: "face"
    };

    // ✅ Add immediately
    localAttendance.push(entry);
    renderAttendance();

    showToast(`Face attendance marked for ${studentName}`, "success");
  });
});
