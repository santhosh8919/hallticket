document.addEventListener("DOMContentLoaded", function () {
  // Login System
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Dummy User Data (Replace with Backend Authentication)
      const user = {
        name: "John Doe",
        email: email,
        courses: ["B.Tech in CSE", "Data Structures & Algorithms"],
        paymentStatus: "Pending",
      };

      if (email === "student@college.com" && password === "123456") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userData", JSON.stringify(user));
        window.location.href = "dashboard.html";
      } else {
        document.getElementById("loginMessage").innerText =
          "Invalid credentials.";
      }
    });
  }

  // Redirect if not logged in
  if (
    [
      "dashboard.html",
      "courses.html",
      "admissions.html",
      "payment.html",
    ].includes(window.location.pathname.split("/").pop())
  ) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      alert("Please login first!");
      window.location.href = "login.html";
    }
  }

  // Load User Data on Dashboard
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData && document.getElementById("dashboardContent")) {
    document.getElementById("studentName").innerText = userData.name;
    document.getElementById("studentEmail").innerText = userData.email;

    // Enrolled Courses
    const coursesList = document.getElementById("enrolledCourses");
    coursesList.innerHTML = "";
    userData.courses.forEach((course) => {
      const li = document.createElement("li");
      li.innerText = course;
      coursesList.appendChild(li);
    });

    // Payment Status
    document.getElementById("paymentStatus").innerText = userData.paymentStatus;
  }

  // Logout
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");
      alert("You have logged out successfully!");
      window.location.href = "login.html";
    });
  }
});
