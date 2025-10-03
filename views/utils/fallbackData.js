const now = new Date();
const iso = now.toISOString();
const addDays = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

const sampleSchedule = [
  {
    day: "monday",
    startTime: "09:00",
    endTime: "10:00",
    courseName: "Strength Training Basics",
    trainer: "Priya Kapoor",
    role: "trainee",
    enrollmentEnds: addDays(20),
  },
  {
    day: "wednesday",
    startTime: "17:30",
    endTime: "18:30",
    courseName: "Yoga Flow",
    trainer: "Rahul Singh",
    role: "trainee",
    enrollmentEnds: addDays(12),
  },
  {
    day: "friday",
    startTime: "07:00",
    endTime: "08:00",
    courseName: "HIIT Conditioning",
    trainer: "Emily Chen",
    role: "trainee",
    enrollmentEnds: addDays(8),
  },
];

const sampleTrainerProfiles = [
  {
    _id: "trainer-1",
    name: "Priya Kapoor",
    email: "priya.kapoor@example.com",
    status: "pending",
    createdAt: iso,
    specializations: ["Yoga", "Mobility"],
    bio: "Certified yoga instructor with a focus on mobility and mindfulness.",
    profilePicture: "/images/about/trainer2.jpg",
    rating: 4.9,
    reviewCount: 128,
  },
  {
    _id: "trainer-2",
    name: "Rahul Singh",
    email: "rahul.singh@example.com",
    status: "active",
    createdAt: iso,
    specializations: ["Strength Training", "Conditioning"],
    bio: "Strength and conditioning coach helping clients build sustainable routines.",
    profilePicture: "/images/about/trainer1.jpg",
    rating: 4.8,
    reviewCount: 112,
  },
  {
    _id: "trainer-3",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    status: "rejected",
    createdAt: iso,
    specializations: ["Dance Fitness", "Zumba"],
    bio: "Energy-driven instructor bringing dance-based workouts to every session.",
    profilePicture: "/images/about/trainer3.jpg",
    rating: 4.7,
    reviewCount: 96,
  },
];

const samplePlan = {
  id: "plan-101",
  _id: "plan-101",
  title: "Strength Training Basics",
  image: "/images/courses/Strength_training.jpg",
  description: "Build foundational strength with guided sessions tailored for all levels.",
  features: {
    duration: "60 Minutes",
    sessions: 3,
    price: "₹1,200",
  },
  category: "Strength Training",
  duration: "4 Weeks",
  sessions: 12,
  price: 11999,
  location: "Studio A",
};

const sampleBooking = {
  _id: "booking-1",
  planTitle: samplePlan.title,
  trainerName: sampleTrainerProfiles[0].name,
  trainer: {
    name: sampleTrainerProfiles[0].name,
    profilePicture: sampleTrainerProfiles[0].profilePicture,
    specializations: sampleTrainerProfiles[0].specializations,
  },
  user: {
    name: "Sonia Sharma",
    profilePicture: "",
  },
  startTime: addDays(2),
  date: addDays(2),
  time: "10:00 AM",
  status: "confirmed",
  notes: "Looking forward to the session!",
};

const sampleUserBookings = [
  {
    ...sampleBooking,
    _id: "booking-2",
    status: "pending",
  },
  {
    ...sampleBooking,
    _id: "booking-3",
    status: "completed",
    startTime: addDays(-5),
  },
  {
    ...sampleBooking,
    _id: "booking-4",
    status: "cancelled",
    startTime: addDays(-10),
  },
];

const sampleCourseSchedule = [
  { day: "monday", startTime: "09:00", endTime: "10:00" },
  { day: "wednesday", startTime: "09:00", endTime: "10:00" },
  { day: "friday", startTime: "09:00", endTime: "10:00" },
  { day: "saturday", startTime: "11:00", endTime: "12:00" },
];

const sampleCourses = [
  {
    _id: "course-1",
    name: "strength training",
    description: "Progressive strength sessions for all experience levels.",
    schedule: sampleCourseSchedule,
  },
  {
    _id: "course-2",
    name: "yoga flow",
    description: "Mindful movement and mobility to reset your body.",
    schedule: [
      { day: "tuesday", startTime: "07:00", endTime: "08:00" },
      { day: "thursday", startTime: "19:00", endTime: "20:00" },
    ],
  },
];

const sampleTrainerCourses = {
  "course-1": true,
};

const sampleEnrolledCourses = [
  {
    _id: "enroll-1",
    courseName: "Strength Training Basics",
    trainerName: sampleTrainerProfiles[1].name,
    isActive: true,
    daysLeft: 9,
    endDate: addDays(9),
    courseSchedule: sampleCourseSchedule,
  },
  {
    _id: "enroll-2",
    courseName: "Yoga Flow",
    trainerName: sampleTrainerProfiles[0].name,
    isActive: false,
    daysLeft: 0,
    endDate: addDays(-2),
    courseSchedule: [
      { day: "tuesday", startTime: "18:00", endTime: "19:00" },
      { day: "thursday", startTime: "18:00", endTime: "19:00" },
    ],
  },
];

const sampleClients = [
  {
    name: "Arjun Mehta",
    email: "arjun@example.com",
    goals: ["Strength", "Mobility"],
    progress: "6 of 12 sessions completed",
    nextSession: addDays(1),
  },
  {
    name: "Nisha Patel",
    email: "nisha@example.com",
    goals: ["Weight Loss"],
    progress: "3 of 8 sessions completed",
    nextSession: addDays(3),
  },
];

const sampleReviews = [
  {
    member: "Sonia Sharma",
    rating: 5,
    feedback: "Amazing session! Felt motivated throughout.",
    createdAt: addDays(-1),
  },
  {
    member: "Karan Patel",
    rating: 4,
    feedback: "Great pacing and attention to detail.",
    createdAt: addDays(-4),
  },
];

const sampleUpcomingSessions = [
  {
    _id: "session-1",
    planTitle: samplePlan.title,
    startTime: addDays(1),
    trainerName: sampleTrainerProfiles[0].name,
  },
  {
    _id: "session-2",
    planTitle: "HIIT Conditioning",
    startTime: addDays(2),
    trainerName: sampleTrainerProfiles[1].name,
  },
];

const sampleActivities = [
  {
    icon: "fa-dumbbell",
    title: "Completed Strength Session",
    timestamp: addDays(-1),
  },
  {
    icon: "fa-clipboard-check",
    title: "Enrolled in Yoga Flow",
    timestamp: addDays(-3),
  },
];

module.exports = {
  adminDashboard: {
    userName: "Avery",
    stats: {
      userCount: 1280,
      trainerCount: 24,
      pendingTrainerCount: 3,
      bookingCount: 540,
      planCount: 18,
    },
    recentUsers: [
      {
        name: "Riya Malhotra",
        email: "riya@example.com",
        role: "user",
        status: "active",
        createdAt: iso,
      },
      {
        name: "Karan Patel",
        email: "karan@example.com",
        role: "trainer",
        status: "pending",
        createdAt: iso,
      },
      {
        name: "Maya Rao",
        email: "maya@example.com",
        role: "user",
        status: "active",
        createdAt: iso,
      },
    ],
    recentBookings: [
      {
        memberName: "Sonia Sharma",
        trainerName: sampleTrainerProfiles[0].name,
        planName: "Strength Training",
        scheduledFor: addDays(1),
        status: "confirmed",
      },
      {
        memberName: "Aman Verma",
        trainerName: sampleTrainerProfiles[1].name,
        planName: "Yoga Basics",
        scheduledFor: addDays(-1),
        status: "completed",
      },
      {
        memberName: "Ishita Jain",
        trainerName: sampleTrainerProfiles[2].name,
        planName: "Zumba",
        scheduledFor: addDays(3),
        status: "pending",
      },
    ],
    recentActivities: [
      {
        title: "New trainer application received",
        timestamp: addDays(-0.5),
        icon: "fa-user-plus",
      },
      {
        title: "5 new course enrollments",
        timestamp: addDays(-1),
        icon: "fa-clipboard-list",
      },
      {
        title: "Marketplace order fulfilled",
        timestamp: addDays(-2),
        icon: "fa-shopping-cart",
      },
    ],
    pendingTrainers: sampleTrainerProfiles
      .filter((trainer) => trainer.status === "pending")
      .map((trainer) => ({
        name: trainer.name,
        email: trainer.email,
        specializations: trainer.specializations,
        experience: 4,
        certifications: ["ACE CPT"],
      })),
    topTrainers: sampleTrainerProfiles.map((trainer, index) => ({
      name: trainer.name,
      specializations: trainer.specializations,
      bookingCount: 120 - index * 12,
      rating: trainer.rating,
    })),
    locals: {
      userName: "Avery",
      userRole: "admin",
      isLoggedIn: true,
    },
  },
  adminTrainers: {
    trainers: sampleTrainerProfiles,
    message: "Trainer list updated successfully.",
    locals: {
      userRole: "admin",
      isLoggedIn: true,
    },
  },
  adminUsers: {
    users: [
      {
        _id: "user-1",
        name: "Ananya Gupta",
        email: "ananya@example.com",
        age: 28,
        gender: "Female",
        createdAt: iso,
        plans: [{ name: "Strength Training" }],
      },
      {
        _id: "user-2",
        name: "Daniel King",
        email: "daniel.king@example.com",
        age: 34,
        gender: "Male",
        createdAt: iso,
        plans: [],
      },
      {
        _id: "user-3",
        name: "Sara Ali",
        email: "sara.ali@example.com",
        age: 26,
        gender: "Female",
        createdAt: iso,
        plans: [{ name: "Yoga Basics" }, { name: "HIIT Express" }],
      },
    ],
    message: "Member directory refreshed.",
    locals: {
      userRole: "admin",
      isLoggedIn: true,
    },
  },
  analytics: {
    locals: {
      userRole: "admin",
      isLoggedIn: true,
    },
  },
  booking: {
    plan: samplePlan,
    trainers: sampleTrainerProfiles.map(({ _id, name, specializations }) => ({
      _id,
      name,
      specializations,
    })),
    locals: {
      userRole: "user",
      isLoggedIn: true,
    },
  },
  bookingPage: {
    plan: samplePlan,
    trainers: sampleTrainerProfiles.map(({ _id, name }) => ({ _id, name })),
    locals: {
      userRole: "user",
      isLoggedIn: true,
    },
  },
  bookingConfirmation: {
    booking: sampleBooking,
    plan: samplePlan,
    locals: {
      userRole: "user",
      isLoggedIn: true,
    },
  },
  "booking-details": {
    booking: sampleBooking,
    plan: samplePlan,
    userRole: "user",
    locals: {
      userRole: "user",
      isLoggedIn: true,
    },
  },
  editProfile: {
    user: {
      name: "Sonia Sharma",
      email: "sonia.sharma@example.com",
      gender: "female",
      age: 29,
    },
    success: "Profile updated successfully!",
    locals: {
      success: "Profile updated successfully!",
      userRole: "user",
      isLoggedIn: true,
    },
  },
  error: {
    statusCode: 404,
    message: "The requested page could not be found.",
    stack: "ReferenceError: sample stack trace",
    locals: {
      isLoggedIn: false,
      userRole: "guest",
      stack: "ReferenceError: sample stack trace",
    },
  },

  pendingApproval: {
    locals: {
      isLoggedIn: true,
      userRole: "trainer",
    },
    hero: {
      heading: "Registration Pending Approval",
      message: "Thank you for registering as a trainer with FitSync!",
    },
    highlights: [
      "Our admin team will review your application within 24-48 hours.",
      "You'll receive an email notification once a decision has been made.",
      "Feel free to prepare your profile details while you wait.",
    ],
  },
  schedule: {
    schedule: sampleSchedule.reduce((acc, session) => {
      acc[session.day] = acc[session.day] || [];
      acc[session.day].push(session);
      return acc;
    }, {}),
    locals: {
      userRole: "user",
      isLoggedIn: true,
    },
  },
  "trainer-bookings": {
    pendingBookings: sampleUserBookings.filter((booking) => booking.status === "pending"),
    upcomingBookings: sampleUserBookings.filter((booking) => booking.status === "confirmed"),
    pastBookings: sampleUserBookings.filter((booking) => booking.status !== "pending" && booking.status !== "confirmed"),
    locals: {
      userRole: "trainer",
      isLoggedIn: true,
    },
  },
  "trainer-registration": {
    courses: sampleCourses,
    registeredCourses: sampleTrainerCourses,
    trainer: {
      trainerCourses: sampleCourses.map((course) => ({
        status: "active",
        course,
        registeredAt: iso,
      })),
    },
    locals: {
      userRole: "trainer",
      isLoggedIn: true,
    },
  },
  trainerDashboard: {
    stats: {
      todayBookings: 3,
      totalBookings: 48,
      clientCount: sampleClients.length,
    },
    locals: {
      userName: sampleTrainerProfiles[0].name,
      userRole: "trainer",
      isLoggedIn: true,
      todaySchedule: [
        { time: "09:00 - 10:00", program: "Strength Training Basics" },
        { time: "16:00 - 17:00", program: "Yoga Flow" },
      ],
      weeklySchedule: [
        { day: "monday", time: "09:00 - 10:00", course: "strength training" },
        { day: "tuesday", time: "11:00 - 12:00", course: "yoga flow" },
        { day: "thursday", time: "18:00 - 19:00", course: "hiit conditioning" },
      ],
      upcomingSessions: sampleUpcomingSessions,
      clients: sampleClients,
      recentReviews: sampleReviews,
    },
  },
  trainers: {
    trainers: sampleTrainerProfiles,
    specializations: [
      "Strength Training",
      "Yoga",
      "Pilates",
      "HIIT",
    ],
    filters: {
      specialization: "",
      sort: "newest",
    },
    locals: {
      isLoggedIn: true,
      userRole: "user",
    },
  },
  "user-bookings": {
    upcomingBookings: sampleUserBookings.filter((booking) => booking.status === "pending" || booking.status === "confirmed"),
    pastBookings: sampleUserBookings.filter((booking) => booking.status === "completed" || booking.status === "cancelled"),
    locals: {
      isLoggedIn: true,
      userRole: "user",
    },
  },
  userDashboard: {
    user: {
      name: "Sonia Sharma",
    },
    flashMessage: "Welcome back! Your session is confirmed for tomorrow.",
    flashType: "success",
    enrolledCourses: sampleEnrolledCourses,
    upcomingSessions: sampleUpcomingSessions,
    recentActivities: sampleActivities,
    locals: {
      flashMessage: "Welcome back!",
      flashType: "success",
      isLoggedIn: true,
      userRole: "user",
    },
  },

  cart: {
    cart: {
      items: [
        {
          product: {
            _id: "prod-1",
            name: "Resistance Bands Set",
            image: "/images/products/resistance-bands.jpg",
            stock: 12,
          },
          quantity: 2,
          price: 1499.0,
        },
        {
          product: {
            _id: "prod-2",
            name: "Hydration Water Bottle",
            image: "/images/products/water-bottle.jpg",
            stock: 30,
          },
          quantity: 1,
          price: 899.0,
        },
      ],
      totalAmount: 3897.0,
    },
    locals: {
      isLoggedIn: true,
      userRole: "user",
    },
  },
};





