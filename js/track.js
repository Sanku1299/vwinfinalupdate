window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const trackingNo = params.get("tracking-number");

    if (trackingNo) {
        document.getElementById("trackingInput").value = trackingNo;
        checkTracking(trackingNo);
        document.getElementById("result").scrollIntoView({ behavior: 'smooth' });
    }
    document.getElementById("trackingInput").value = "";

};
function checkTracking() {

    const trackingNo = document.getElementById("trackingInput").value.trim();
    if (!trackingNo) {
        alert("Please enter a tracking number.");
        return;
    }

    const resultEl = document.getElementById("result");
    resultEl.innerText = "Loading...";
    resultEl.scrollIntoView({ behavior: 'smooth' });

    const baseURL = "https://admin.v-winexpress.com/api/tracking_api/get_tracking_data?api_company_id=3&customer_code=superadmin";

    // First try with tracking_no
    fetch(`${baseURL}&tracking_no=${trackingNo}`)
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0 && data[0].errors === false) {
                displayTrackingData(data[0]);
            } else {
                // Try with forwarding_no1
                fetch(`${baseURL}&forwarding_no1=${trackingNo}`)
                    .then(res2 => res2.json())
                    .then(data2 => {
                        if (Array.isArray(data2) && data2.length > 0 && data2[0].errors === false) {
                            displayTrackingData(data2[0]);
                        } else {
                            // Try with forwarding_no2
                            fetch(`${baseURL}&forwarding_no2=${trackingNo}`)
                                .then(res3 => res3.json())
                                .then(data3 => {
                                    if (Array.isArray(data3) && data3.length > 0 && data3[0].errors === false) {
                                        displayTrackingData(data3[0]);
                                    } else {
                                        resultEl.innerText = "No tracking information found.";
                                    }
                                })
                                .catch(err => {
                                    console.error(err);
                                    resultEl.innerText = "Failed to fetch tracking data.";
                                });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        resultEl.innerText = "Failed to fetch tracking data.";
                    });
            }
        })
        .catch(err => {
            console.error(err);
            resultEl.innerText = "Failed to fetch tracking data.";
        });
}

function displayTrackingData(data) {
    const resultEl = document.getElementById("result");
    resultEl.innerHTML = `<div class="table-box">
        <div class="header">
          <h3>AWB: ${data.tracking_no}</h3>
          <h3>STATUS: ${data.docket_info[4][1]}</h3>
        </div>
        <h3 id="AWB-NO" style="text-align:center">AWB: ${data.tracking_no}</h3>
        <div class="inner-box">
        <h3 style="margin-bottom:15px">Tracking Information</h3>
        <div style="overflow-x: auto;">
        <table id="trackig-info">
          <tr><th>AWB No.</th><th>Booking Date</th><th>Consignee Name</th><th>Destination</th><th>No. of Pieces</th><th>Status</th><th>Delivery Date</th><th>Delivery Time</th><th>Receiver Name</th><th>Forwarding No.</th><th>View POD</th></tr>
          <tr>
            <td>${data.tracking_no || ""}</td>
            <td>${data.docket_info[1]?.[1] || ""}</td>
            <td>${data.docket_info[2]?.[1] || ""}</td>
            <td>${data.docket_info[3]?.[1] || ""}</td>
            <td>${data.pcs || ""}</td>
            <td>${data.docket_info[4]?.[1] || ""}</td>
            <td>${(data.docket_info[5]?.[1] || "").split(" ")[0] || ""}</td>
            <td>${(data.docket_info[5]?.[1] || "").split(" ")[1] || ""}</td>
            <td>${data.docket_info[6]?.[1] || ""}</td>
            <td>${data.forwarding_no || ""}</td>
            <td>${data.pod_image || ""}</td>
          </tr>
        </table>
        </div>
        <h3 style="margin:15px 0">Delivery Information</h3>
        <div style="overflow-x: auto;">
        <table id="eventsTable">
          <thead><tr><th>Date</th><th>Time</th><th>Location</th><th>Activity</th><th>Remarks</th></tr></thead>
          <tbody></tbody>
        </table>
        </div>
        </div>
      </div>`;

    const events = data.docket_events || [];
    const tableBody = document.querySelector("#eventsTable tbody");

    events.forEach(event => {
        const [date, time] = event.event_at.split(" ");
        const row = `
          <tr>
            <td>${date}</td>
            <td>${time}</td>
            <td>${event.event_location}</td>
            <td>${event.event_description}</td>
            <td>${event.event_remark || "-"}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const ddItems = document.querySelectorAll('.has-dropdown'); // support multiple dropdowns
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Dropdown toggle (works for each dropdown)
  ddItems.forEach(ddItem => {
    const caret = ddItem.querySelector('.caret');
    const dropdown = ddItem.querySelector('.dropdown');

    function toggleDropdown() {
      ddItem.classList.toggle('open');
      const isOpen = ddItem.classList.contains('open');
      caret.setAttribute('aria-expanded', String(isOpen));
      caret.classList.toggle("rotate", isOpen);
    }

    // Click caret
    caret.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown();
    });

    // Keyboard access
    caret.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
    });
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Reset nav on resize (desktop view)
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      document.querySelectorAll(".dropdown").forEach(d => d.style.maxHeight = "");
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});