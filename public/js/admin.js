// Admin panel JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });
  
  // User search functionality
  const userSearchInput = document.getElementById('userSearch');
  if (userSearchInput) {
    userSearchInput.addEventListener('input', function() {
      filterUsers(this.value);
    });
  }
  
  // Trainer search functionality
  const trainerSearchInput = document.getElementById('trainerSearch');
  if (trainerSearchInput) {
    trainerSearchInput.addEventListener('input', function() {
      filterTrainers(this.value);
    });
  }
  
  // Fetch and display user details in modal
  setupUserDetailsModal();
});

// Filter users based on search input
function filterUsers(searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  const rows = document.querySelectorAll('.user-row');
  
  rows.forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    const email = row.cells[1].textContent.toLowerCase();
    
    if (name.includes(searchTerm) || email.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Filter trainers based on search input
function filterTrainers(searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  const rows = document.querySelectorAll('.trainer-row');
  
  rows.forEach(row => {
    const name = row.cells[0].textContent.toLowerCase();
    const email = row.cells[1].textContent.toLowerCase();
    
    if (name.includes(searchTerm) || email.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Setup user details modal functionality
function setupUserDetailsModal() {
  const userDetailsButtons = document.querySelectorAll('.view-user-details');
  const userDetailsModal = document.getElementById('userDetailsModal');
  const userDetailsContent = document.getElementById('userDetailsContent');
  
  if (userDetailsButtons.length && userDetailsModal && userDetailsContent) {
    userDetailsButtons.forEach(button => {
      button.addEventListener('click', function() {
        const userId = this.getAttribute('data-id');
        
        // Show loading state
        userDetailsContent.innerHTML = `
          <div class="text-center">
            <div class="spinner-border text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p>Loading user details...</p>
          </div>
        `;
        
        // Open the modal
        const modal = new bootstrap.Modal(userDetailsModal);
        modal.show();
        
        // Fetch user details
        fetch(`/admin/users/details/${userId}`)
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              const user = data.user;
              
              // Format registration date
              const registrationDate = new Date(user.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });
              
              // Render plans list
              let plansHtml = '';
              if (user.plans && user.plans.length > 0) {
                plansHtml = '<ul class="list-group list-group-flush bg-dark">';
                user.plans.forEach(plan => {
                  plansHtml += `
                    <li class="list-group-item bg-dark text-light border-secondary">
                      <strong>${plan.title}</strong> - ${plan.category}
                      <span class="badge bg-info float-end">${plan.duration}</span>
                    </li>
                  `;
                });
                plansHtml += '</ul>';
              } else {
                plansHtml = '<p>No active plans</p>';
              }
              
              // Render recent bookings
              let bookingsHtml = '';
              if (user.recentBookings && user.recentBookings.length > 0) {
                bookingsHtml = '<ul class="list-group list-group-flush bg-dark">';
                user.recentBookings.forEach(booking => {
                  let statusClass = 'bg-info';
                  if (booking.status === 'completed') statusClass = 'bg-success';
                  if (booking.status === 'cancelled') statusClass = 'bg-danger';
                  
                  bookingsHtml += `
                    <li class="list-group-item bg-dark text-light border-secondary">
                      ${new Date(booking.date).toLocaleDateString()} at ${booking.time}
                      <span class="badge ${statusClass} float-end">${booking.status}</span>
                      <div class="small text-muted">Trainer: ${booking.trainer}</div>
                    </li>
                  `;
                });
                bookingsHtml += '</ul>';
              } else {
                bookingsHtml = '<p>No recent bookings</p>';
              }
              
              // Update the modal content with user details
              userDetailsContent.innerHTML = `
                <div class="row">
                  <div class="col-md-6">
                    <div class="user-profile-header mb-4">
                      <div class="display-6">${user.name}</div>
                      <div class="text-muted">${user.email}</div>
                    </div>
                    
                    <h5>Personal Information</h5>
                    <div class="row mb-3">
                      <div class="col-6">
                        <div class="mb-2"><strong>Gender:</strong></div>
                        <div>${user.gender}</div>
                      </div>
                      <div class="col-6">
                        <div class="mb-2"><strong>Age:</strong></div>
                        <div>${user.age}</div>
                      </div>
                    </div>
                    
                    <div class="mb-3">
                      <div class="mb-2"><strong>Member Since:</strong></div>
                      <div>${registrationDate}</div>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <h5>Active Plans</h5>
                    <div class="mb-3">
                      ${plansHtml}
                    </div>
                    
                    <h5>Recent Bookings</h5>
                    <div>
                      ${bookingsHtml}
                    </div>
                  </div>
                </div>
              `;
            } else {
              userDetailsContent.innerHTML = `
                <div class="alert alert-danger">
                  Failed to load user details. Please try again.
                </div>
              `;
            }
          })
          .catch(error => {
            console.error('Error fetching user details:', error);
            userDetailsContent.innerHTML = `
              <div class="alert alert-danger">
                An error occurred while loading user details. Please try again.
              </div>
            `;
          });
      });
    });
  }
}