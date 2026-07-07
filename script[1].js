// Success Digital Solutions - Website Interactions

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Mobile Navigation Menu ---
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileDropdown = document.getElementById("mobile-dropdown");
    const menuIcon = document.getElementById("menu-icon");

    if (mobileMenuBtn && mobileDropdown) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileDropdown.classList.toggle("hidden");
            if (mobileDropdown.classList.contains("hidden")) {
                menuIcon.textContent = "menu";
            } else {
                menuIcon.textContent = "close";
            }
        });

        // Close mobile dropdown when a link is clicked
        const mobileLinks = mobileDropdown.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileDropdown.classList.add("hidden");
                menuIcon.textContent = "menu";
            });
        });
    }

    // --- Dynamic Portfolio Filtering ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active style from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove("active", "bg-cyber-cyan", "text-cyber-darkBg");
                btn.classList.add("bg-cyber-cardBg", "border", "border-cyber-border", "text-slate-400");
            });

            // Add active style to selected button
            button.classList.add("active", "bg-cyber-cyan", "text-cyber-darkBg");
            button.classList.remove("bg-cyber-cardBg", "border", "border-cyber-border", "text-slate-400");

            const filterValue = button.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                const category = item.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });

    // --- Dynamic Consultation Calendar Generator ---
    // Generate the next 5 working weekdays (skipping weekends) starting from today
    const bookingDatesContainer = document.getElementById("booking-dates");
    if (bookingDatesContainer) {
        const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        
        let currentDate = new Date(); // Start from current client time
        let count = 0;
        let datesHtml = "";

        while (count < 5) {
            // Check if day is weekend (0 = Sunday, 6 = Saturday)
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                const dayNum = currentDate.getDate();
                const dayName = weekdays[dayOfWeek];
                const monthName = months[currentDate.getMonth()];
                const isFirst = count === 0;

                datesHtml += `
                    <div class="booking-date-btn flex items-center justify-between p-3.5 rounded-xl border border-cyber-border bg-black/40 hover:border-cyber-cyan hover:bg-cyber-cyan/5 transition-all cursor-pointer ${isFirst ? 'border-cyber-cyan bg-cyber-cyan/10 text-white font-bold' : 'text-slate-400'}" data-date="${dayName}, ${monthName} ${dayNum}">
                        <div class="flex items-center gap-3">
                            <div class="text-sm font-bold uppercase font-mono">${dayName}</div>
                            <div class="text-xs text-slate-500 font-mono">${monthName} ${dayNum}</div>
                        </div>
                        <span class="material-icons-outlined text-sm text-cyber-cyan select-indicator">${isFirst ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                    </div>
                `;
                count++;
            }
            // Move to next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        bookingDatesContainer.innerHTML = datesHtml;

        // Add Event Listeners to generated date buttons
        const dateButtons = document.querySelectorAll(".booking-date-btn");
        dateButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                // Remove active styling from all date buttons
                dateButtons.forEach(b => {
                    b.classList.remove("border-cyber-cyan", "bg-cyber-cyan/10", "text-white", "font-bold");
                    b.classList.add("text-slate-400");
                    b.querySelector(".select-indicator").textContent = "radio_button_unchecked";
                });

                // Add active styling to clicked button
                btn.classList.add("border-cyber-cyan", "bg-cyber-cyan/10", "text-white", "font-bold");
                btn.classList.remove("text-slate-400");
                btn.querySelector(".select-indicator").textContent = "radio_button_checked";
            });
        });
    }

    // --- Interactive Booking Time Slot Selection ---
    const timeSlots = document.querySelectorAll("#booking-time-slots button");
    timeSlots.forEach(slot => {
        slot.addEventListener("click", (e) => {
            e.preventDefault();
            // Clear active style from other slots
            timeSlots.forEach(s => {
                s.className = "py-2 rounded-lg bg-white/5 border border-cyber-border text-slate-400 hover:text-white font-mono text-xs hover:bg-white/10";
            });
            // Set active style for clicked slot
            slot.className = "py-2 rounded-lg bg-cyber-cyan text-cyber-darkBg font-mono text-xs font-bold active-slot";
        });
    });

    // --- Consultation Registration Submit ---
    const bookingForm = document.getElementById("booking-form");
    const bookingSuccess = document.getElementById("booking-success-message");

    if (bookingForm && bookingSuccess) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Collect form properties
            const name = document.getElementById("booking-name").value;
            const email = document.getElementById("booking-email").value;
            const module = document.getElementById("booking-module").value;
            const selectedDateBtn = document.querySelector(".booking-date-btn.border-cyber-cyan");
            const selectedDate = selectedDateBtn ? selectedDateBtn.getAttribute("data-date") : "Upcoming Date";
            const selectedTimeSlot = document.querySelector("#booking-time-slots .active-slot").textContent;

            // Log details in developer tools to replicate API handling
            console.log(`Success Digital Solutions: Registering session for ${name} (${email})`);
            console.log(`Topic: ${module} | Scheduled: ${selectedDate} at ${selectedTimeSlot}`);

            // Simulate TLS dispatch dispatch latency
            bookingSuccess.classList.remove("hidden");
            bookingSuccess.innerHTML = `
                <span class="material-icons-outlined text-sm">check_circle</span>
                <span>Session registered successfully for <strong>${selectedDate} at ${selectedTimeSlot}</strong>. Secure conference ticket dispatched to <strong>${email}</strong>.</span>
            `;
            
            // Clean up inputs
            bookingForm.reset();
            setTimeout(() => {
                bookingSuccess.classList.add("hidden");
            }, 6000);
        });
    }

    // --- Secure TLS Contact Form Submit ---
    const contactForm = document.getElementById("contact-form");
    const contactSuccess = document.getElementById("contact-success-message");

    if (contactForm && contactSuccess) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const clientName = document.getElementById("contact-name").value;
            const clientEmail = document.getElementById("contact-email").value;

            console.log(`Encrypted dispatch sent from ${clientName} (${clientEmail})`);

            contactSuccess.classList.remove("hidden");
            contactForm.reset();

            setTimeout(() => {
                contactSuccess.classList.add("hidden");
            }, 5000);
        });
    }

});
