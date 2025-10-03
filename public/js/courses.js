// Highlight active course and switch panels
if (typeof document !== 'undefined') {
  document.querySelectorAll('#course-list a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.course-detail').forEach(detail => {
        detail.classList.add('d-none');
      });
      document.querySelector(this.getAttribute('href')).classList.remove('d-none');
      document.querySelectorAll('#course-list a').forEach(item => {
        item.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // Course booking interactions
  let allCourses = [];

  fetch('/courses/api/courses')
    .then(response => response.json())
    .then(data => {
      if (data.data && Array.isArray(data.data)) {
        allCourses = data.data;

        document.querySelectorAll('.book-now-btn').forEach(button => {
          const courseName = button.getAttribute('data-course-name').toLowerCase();
          const courseObj = allCourses.find(c => c.name.toLowerCase() === courseName.toLowerCase());

          if (courseObj) {
            button.setAttribute('data-course-id', courseObj._id);
          }
        });
      }
    })
    .catch(error => console.error('Error fetching courses:', error));

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document.querySelectorAll('.book-now-btn').forEach(button => {
    button.addEventListener('click', function () {
      const courseId = this.getAttribute('data-course-id');
      const courseName = this.getAttribute('data-course-name');

      document.getElementById('courseNameHeader').textContent = courseName;
      document.getElementById('courseIdInput').value = courseId;

      document.getElementById('courseScheduleTable').innerHTML = '';
      const trainerSelect = document.getElementById('trainerSelect');
      trainerSelect.innerHTML = '<option value="" selected disabled>Choose a trainer...</option>';
      document.getElementById('noTrainersMessage').classList.add('d-none');
      document.getElementById('confirmEnrollButton').disabled = true;

      fetch(`/courses/api/courses/${courseId}`)
        .then(response => response.json())
        .then(data => {
          if (data.data && data.data.schedule) {
            const scheduleTable = document.getElementById('courseScheduleTable');
            const dayOrder = {
              monday: 1,
              tuesday: 2,
              wednesday: 3,
              thursday: 4,
              friday: 5,
              saturday: 6,
              sunday: 7,
            };

            const sortedSchedule = [...data.data.schedule].sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);

            sortedSchedule.forEach(session => {
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${capitalizeFirstLetter(session.day)}</td>
                <td>${session.startTime} - ${session.endTime}</td>
              `;
              scheduleTable.appendChild(row);
            });
          }
        })
        .catch(error => console.error('Error fetching course details:', error));

      fetch(`/courses/api/courses/${courseId}/trainers`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.data && data.data.length > 0) {
            const trainerSelectElement = document.getElementById('trainerSelect');
            trainerSelectElement.innerHTML = '<option value="" selected disabled>Choose a trainer...</option>';

            data.data.forEach(trainer => {
              const option = document.createElement('option');
              option.value = trainer._id;
              option.textContent = trainer.name;
              trainerSelectElement.appendChild(option);
            });

            document.getElementById('confirmEnrollButton').disabled = false;
            document.getElementById('noTrainersMessage').classList.add('d-none');
          } else {
            document.getElementById('noTrainersMessage').classList.remove('d-none');
            trainerSelect.innerHTML = '<option value="" disabled>No trainers available for this course</option>';
            document.getElementById('confirmEnrollButton').disabled = true;
          }
        })
        .catch(error => {
          console.error('Error fetching trainers:', error);
          document.getElementById('noTrainersMessage').classList.remove('d-none');
        });
    });
  });

  const trainerSelectElement = document.getElementById('trainerSelect');
  if (trainerSelectElement) {
    trainerSelectElement.addEventListener('change', function () {
      document.getElementById('confirmEnrollButton').disabled = !this.value;
    });
  }

  const enrollmentForm = document.getElementById('enrollmentForm');
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const courseId = document.getElementById('courseIdInput').value;
      const trainerId = document.getElementById('trainerSelect').value;

      if (!trainerId) {
        alert('Please select a trainer.');
        return;
      }

      fetch('/courses/api/courses/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          courseId,
          trainerId,
        }),
        credentials: 'same-origin',
      })
        .then(response => {
          if (response.status === 403) {
            return response.json().then(data => {
              throw new Error('Only trainees can enroll in courses. Trainers and administrators cannot enroll.');
            });
          }
          if (!response.ok) {
            return response.json().then(data => {
              throw new Error(data.message || 'Error enrolling in course');
            });
          }
          return response.json();
        })
        .then(() => {
          const modal = bootstrap.Modal.getInstance(document.getElementById('bookCourseModal'));
          if (modal) {
            modal.hide();
          }
          alert('Successfully enrolled in the course!');
          window.location.href = '/user/dashboard';
        })
        .catch(error => {
          console.error('Error:', error);
          alert(error.message || 'An error occurred. Please try again later.');
        });
    });
  }
}
