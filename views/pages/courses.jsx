const React = require("react");
const ejs = require("ejs");
const MainLayout = require("../layouts/MainLayout");

const template = String.raw`
<div class="courses-hero">
  <div class="container">
    <h1 class="display-4 text-center text-white mb-0 fw-bold">Our Fitness Programs</h1>
    <p class="lead text-center text-white mb-0">Discover the perfect workout routine for your fitness goals</p>
  </div>
</div>

<div class="container my-5">
  <div class="row g-4">
    <div class="col-lg-4 col-md-5">
      <div class="course-sidebar">
        <h4 class="course-sidebar-title mb-4">Browse Programs</h4>
        <div class="list-group course-list" id="course-list">
          <a href="#strength-training" class="list-group-item list-group-item-action active d-flex align-items-center" aria-current="true">
            <i class="fas fa-dumbbell me-3"></i>
            <div>
              <div class="fw-bold">Strength Training</div>
              <small class="text-muted">Build muscle & power</small>
            </div>
          </a>
          <a href="#yoga" class="list-group-item list-group-item-action d-flex align-items-center">
            <i class="fas fa-pray me-3"></i>
            <div>
              <div class="fw-bold">Yoga</div>
              <small class="text-muted">Flexibility & mindfulness</small>
            </div>
          </a>
          <a href="#zumba" class="list-group-item list-group-item-action d-flex align-items-center">
            <i class="fas fa-music me-3"></i>
            <div>
              <div class="fw-bold">Zumba</div>
              <small class="text-muted">Dance & cardio</small>
            </div>
          </a>
        </div>
        
        <div class="mt-5 course-info-panel">
          <h5><i class="fas fa-info-circle me-2"></i>Why Choose Us?</h5>
          <ul class="course-benefits">
            <li><i class="fas fa-check-circle me-2"></i>Expert certified trainers</li>
            <li><i class="fas fa-check-circle me-2"></i>Small group sessions</li>
            <li><i class="fas fa-check-circle me-2"></i>Flexible schedules</li>
            <li><i class="fas fa-check-circle me-2"></i>Modern equipment</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-lg-8 col-md-7">
      <!-- Strength Training -->
      <div id="strength-training" class="course-detail">
        <div class="course-card">
</div>
          <div class="course-content">
            <h3 class="course-title">Strength Training</h3>
            <div class="course-rating mb-3">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>
              <span class="ms-2">4.5 (120 reviews)</span>
            </div>
            <p class="course-description">Build muscle and strength with our comprehensive strength training programs. Our expert trainers will guide you through progressive resistance exercises designed to increase your physical power and metabolic rate.</p>
            
            <div class="course-features">
              <div class="feature">
                <i class="fas fa-money-bill-wave feature-icon"></i>
                <div>
                  <div class="feature-label">Price</div>
                  <div class="feature-value">Ã¢â€šÂ¹2000 per month</div>
                </div>
              </div>
              <div class="feature">
                <i class="fas fa-calendar-alt feature-icon"></i>
                <div>
                  <div class="feature-label">Frequency</div>
                  <div class="feature-value">4 classes per week</div>
                </div>
              </div>
              <div class="feature">
                <i class="fas fa-clock feature-icon"></i>
                <div>
                  <div class="feature-label">Duration</div>
                  <div class="feature-value">1.5 hour per session</div>
                </div>
              </div>
            </div>
            
            <div class="course-footer">
              <% if (locals.isLoggedIn && locals.userRole === "user") { %>
                <a href="#" class="btn btn-danger mt-auto book-now-btn" data-course-id="1" data-course-name="Strength Training" data-bs-toggle="modal" data-bs-target="#bookCourseModal">
                  <i class="fas fa-calendar-check me-2"></i>Book Now
                </a>
              <% } else if (!locals.isLoggedIn) { %>
                <a href="/auth/login?redirect=/courses" class="btn btn-danger">
                  <i class="fas fa-lock me-2"></i> Login to Book 
                </a>
              <% } else { %>
                <div class="alert alert-info py-2 small mb-0">
                  <i class="fas fa-info-circle me-1"></i> Only trainees can book courses
                </div>
              <% } %>
            </div>
          </div>
        </div>
      </div>

      <!-- Yoga -->
      <div id="yoga" class="course-detail d-none">
        <div class="course-card">
<div class="course-content">
            <h3 class="course-title">Yoga</h3>
            <div class="course-rating mb-3">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="far fa-star"></i>
              <span class="ms-2">4.0 (85 reviews)</span>
            </div>
            <p class="course-description">Find your inner peace and improve flexibility with our yoga classes. Combining physical postures, breathing exercises, and meditation, our yoga sessions are perfect for stress relief and improving overall wellness.</p>
            
            <div class="course-features">
              <div class="feature">
                <i class="fas fa-money-bill-wave feature-icon"></i>
                <div>
                  <div class="feature-label">Price</div>
                  <div class="feature-value">Ã¢â€šÂ¹1200 per month</div>
                </div>
              </div>
              <div class="feature">
                <i class="fas fa-calendar-alt feature-icon"></i>
                <div>
                  <div class="feature-label">Frequency</div>
                  <div class="feature-value">2 classes per week</div>
                </div>
              </div>
              <div class="feature">
                <i class="fas fa-clock feature-icon"></i>
                <div>
                  <div class="feature-label">Duration</div>
                  <div class="feature-value">1 hour per session</div>
                </div>
              </div>
            </div>
            
            <div class="course-footer">
              <% if (locals.isLoggedIn && locals.userRole === "user") { %>
                <a href="#" class="btn btn-danger mt-auto book-now-btn" data-course-id="2" data-course-name="Yoga" data-bs-toggle="modal" data-bs-target="#bookCourseModal">
                  <i class="fas fa-calendar-check me-2"></i>Book Now
                </a>
              <% } else if (!locals.isLoggedIn) { %>
                <a href="/auth/login?redirect=/courses" class="btn btn-danger">
                  <i class="fas fa-lock me-2"></i> Login to Book
                </a>
              <% } else { %>
                <div class="alert alert-info py-2 small mb-0">
                  <i class="fas fa-info-circle me-1"></i> Only trainees can book courses
                </div>
              <% } %>
            </div>
          </div>
        </div>
      </div>

      <!-- Zumba -->
      <div id="zumba" class="course-detail d-none">
        <div class="course-card">
</div>
          <div class="course-content">
            <h3 class="course-title">Zumba</h3>
            <div class="course-rating mb-3">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <span class="ms-2">4.8 (95 reviews)</span>
            </div>
            <p class="course-description">Get fit and have fun with our high-energy Zumba classes. This Latin-inspired dance workout is perfect for burning calories while enjoying upbeat music. Suitable for all fitness levels, no dance experience needed!</p>
            
            <div class="course-features">
              <div class="feature">
                <i class="fas fa-money-bill-wave feature-icon"></i>
                <div>
                  <div class="feature-label">Price</div>
                  <div class="feature-value">Ã¢â€šÂ¹1500 per month</div>
                </div>
              </div>
              <div class="feature">
                <i class="fas fa-calendar-alt feature-icon"></i>
                <div>
                  <div class="feature-label">Frequency</div>
                  <div class="feature-value">3 classes per week</div>
                </div>
              </div>
              <div class="feature">
                <i class="fas fa-clock feature-icon"></i>
                <div>
                  <div class="feature-label">Duration</div>
                  <div class="feature-value">1 hour per session</div>
                </div>
              </div>
            </div>
            
            <div class="course-footer">
              <% if (locals.isLoggedIn && locals.userRole === "user") { %>
                <a href="#" class="btn btn-danger mt-auto book-now-btn" data-course-id="3" data-course-name="Zumba" data-bs-toggle="modal" data-bs-target="#bookCourseModal">
                  <i class="fas fa-calendar-check me-2"></i>Book Now
                </a>
              <% } else if (!locals.isLoggedIn) { %>
                <a href="/auth/login?redirect=/courses" class="btn btn-danger">
                  <i class="fas fa-lock me-2"></i> Login to Book
                </a>
              <% } else { %>
                <div class="alert alert-info py-2 small mb-0">
                  <i class="fas fa-info-circle me-1"></i> Only trainees can book courses
                </div>
              <% } %>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .courses-hero {
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                url('/images/courses/header_bg.png');
    background-size: 100% 100%; 
    background-position: center;
    background-repeat: no-repeat;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

  
  .course-sidebar {
    background-color: #212121;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  .course-sidebar-title {
    color: var(--primary-color);
    font-weight: 600;
    border-bottom: 1px solid #444;
    padding-bottom: 15px;
  }
  
  .list-group-item {
    background-color: #2a2a2a;
    border: none;
    border-radius: 8px !important;
    margin-bottom: 10px;
    transition: all 0.3s;
    color: var(--light-text);
  }
  
  .list-group-item:hover, .list-group-item.active {
    background-color: #333;
    transform: translateX(5px);
  }
  
  .list-group-item.active {
    background-color: var(--primary-color);
    border-left: 5px solid #ff5f6a;
  }
  
  .list-group-item i {
    font-size: 24px;
    width: 30px;
    text-align: center;
  }
  
  .course-info-panel {
    background-color: #2a2a2a;
    border-radius: 8px;
    padding: 20px;
    color: var(--light-text);
  }
  
  .course-benefits {
    padding-left: 0;
    list-style: none;
    margin-top: 15px;
  }
  
  .course-benefits li {
    margin-bottom: 10px;
    color: #ccc;
  }
  
  .course-benefits i {
    color: var(--primary-color);
  }
  
  .course-card {
    background-color: #212121;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .course-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(229, 9, 20, 0.2);
  }
  
  .course-image {
    height: 300px;
    position: relative;
    overflow: hidden;
  }
  
  .course-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .course-card:hover .course-image img {
    transform: scale(1.1);
  }
  
  .course-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: var(--primary-color);
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
  }
  
  .course-content {
    padding: 30px;
    color: var(--light-text);
  }
  
  .course-title {
    font-weight: 700;
    margin-bottom: 15px;
    color: var(--primary-color);
  }
  
  .course-rating {
    color: #ffc107;
  }
  
  .course-description {
    margin-bottom: 25px;
    color: #ccc;
    line-height: 1.6;
  }
  
  .course-features {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 8px;
    background-color: #2a2a2a;
  }
  
  .feature {
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 180px;
  }
  
  .feature-icon {
    font-size: 24px;
    color: var(--primary-color);
    margin-right: 15px;
  }
  
  .feature-label {
    font-size: 12px;
    color: #999;
    margin-bottom: 5px;
  }
  
  .feature-value {
    font-weight: 600;
  }
  
  .course-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }
  
  .btn-danger {
    background-color: var(--primary-color);
    border: none;
    padding: 10px 25px;
    border-radius: 5px;
    transition: all 0.3s;
  }
  
  .btn-danger:hover {
    background-color: var(--hover-color);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(229, 9, 20, 0.3);
  }
  
  .btn-outline-danger {
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    background: transparent;
    padding: 10px 20px;
    border-radius: 5px;
    transition: all 0.3s;
  }
  
  .btn-outline-danger:hover {
    background-color: rgba(229, 9, 20, 0.1);
    color: var(--primary-color);
  }
</style>



<!-- Course Booking Modal -->
<div class="modal fade" id="bookCourseModal" tabindex="-1" aria-labelledby="bookCourseModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content bg-dark text-light">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="bookCourseModalLabel">Book Course</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h4 id="courseNameHeader" class="mb-3">Course Name</h4>
        
        <!-- Weekly Schedule Section -->
        <div class="mb-4">
          <h5><i class="fas fa-calendar-week me-2"></i>Weekly Schedule</h5>
          <div class="table-responsive">
            <table class="table table-bordered table-hover text-light">
              <thead class="bg-secondary text-white">
                <tr>
                  <th>Day</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody id="courseScheduleTable">
                <!-- Schedule rows will be added dynamically -->
              </tbody>
            </table>
          </div>
          <p class="text-muted small">Note: This is a fixed weekly schedule. Classes occur at the same time each week.</p>
        </div>
        
        <!-- Trainer Selection Section -->
        <form id="enrollmentForm">
          <input type="hidden" id="courseIdInput" name="courseId">
          
          <div class="mb-3">
            <h5><i class="fas fa-user-tie me-2"></i>Select Trainer</h5>
            <select class="form-select bg-secondary text-white" id="trainerSelect" name="trainerId" required>
              <option value="" selected disabled>Choose a trainer...</option>
              <!-- Trainer options will be added dynamically -->
            </select>
            <div id="noTrainersMessage" class="alert alert-warning mt-2 d-none">
              No trainers are currently available for this course. Please check back later.
            </div>
          </div>
          
          <div class="alert alert-info">
            <i class="fas fa-info-circle me-2"></i>
            <strong>Enrollment Info:</strong> 
            <ul class="mb-0">
              <li>Your enrollment will be active for 4 weeks (1 month)</li>
              <li>You can renew your enrollment after the period ends</li>
              <li>You can't enroll in the same course twice</li>
            </ul>
          </div>
          
          <div class="d-grid gap-2 mt-4">
            <button type="submit" class="btn btn-danger" id="confirmEnrollButton">
              <i class="fas fa-check-circle me-2"></i>Confirm Enrollment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
`;

function Courses(props) {
  const locals = {
    isLoggedIn: !!props.isLoggedIn,
    userRole: props.userRole || "user",
    ...props,
  };

  const html = ejs.render(template, { ...props, locals });

  return (
    <MainLayout {...props} scripts={["/js/courses.js"]}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </MainLayout>
  );
}

module.exports = Courses;






