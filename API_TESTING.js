// API Test Examples
// Use these with tools like Postman, Thunder Client (VS Code), or curl

// ============================================
// Test Contact Form Submission
// ============================================

// Using cURL (command line)
/*
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "message": "This is a test message with more than 10 characters"
  }'
*/

// Using fetch in browser console or Node.js
/*
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullname: 'Jane Smith',
    email: 'jane@example.com',
    message: 'Hello, I am interested in your services.'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err))
*/

// ============================================
// Test Cases
// ============================================

const testCases = [
  {
    name: 'Valid submission',
    data: {
      fullname: 'Raj Kumar',
      email: 'raj@example.com',
      message: 'I would like to collaborate on a web development project.'
    },
    expectedStatus: 201,
    shouldSucceed: true
  },
  {
    name: 'Missing fullname',
    data: {
      email: 'test@example.com',
      message: 'Test message here'
    },
    expectedStatus: 400,
    shouldSucceed: false
  },
  {
    name: 'Invalid email format',
    data: {
      fullname: 'Test User',
      email: 'invalid-email',
      message: 'Test message here'
    },
    expectedStatus: 400,
    shouldSucceed: false
  },
  {
    name: 'Message too short (< 10 chars)',
    data: {
      fullname: 'Test User',
      email: 'test@example.com',
      message: 'Short'
    },
    expectedStatus: 400,
    shouldSucceed: false
  },
  {
    name: 'All fields empty',
    data: {
      fullname: '',
      email: '',
      message: ''
    },
    expectedStatus: 400,
    shouldSucceed: false
  }
];

// ============================================
// Test Runner (Node.js)
// ============================================

/*
async function runTests() {
  console.log('🧪 Starting API Tests...\n');

  for (const testCase of testCases) {
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.data)
      });

      const data = await response.json();
      const passed = response.status === testCase.expectedStatus;

      console.log(`${passed ? '✅' : '❌'} ${testCase.name}`);
      console.log(`   Status: ${response.status} (expected ${testCase.expectedStatus})`);
      console.log(`   Success: ${data.success}`);
      console.log(`   Message: ${data.message}\n`);
    } catch (error) {
      console.log(`❌ ${testCase.name} - ERROR`);
      console.log(`   ${error.message}\n`);
    }
  }

  console.log('✅ Tests completed');
}

// Uncomment to run tests
// runTests();
*/

// ============================================
// Health Check
// ============================================

/*
fetch('http://localhost:5000/api/health')
  .then(res => res.json())
  .then(data => console.log('Server status:', data))
  .catch(err => console.error('Server offline:', err.message))
*/

// ============================================
// Example Responses
// ============================================

// Success Response (201 Created)
const successResponse = {
  success: true,
  message: "Your message has been sent successfully!",
  data: {
    id: "507f1f77bcf86cd799439011",
    fullname: "Raj Kumar",
    email: "raj@example.com",
    createdAt: "2024-04-19T10:30:00.000Z"
  }
};

// Error Response (400 Bad Request)
const errorResponse = {
  success: false,
  message: "Validation error",
  errors: [
    "Email is required",
    "Message must be at least 10 characters"
  ]
};

// Database Entry (what's saved)
const databaseEntry = {
  _id: "507f1f77bcf86cd799439011",
  fullname: "Raj Kumar",
  email: "raj@example.com",
  message: "I would like to collaborate on a web development project.",
  status: "new",
  ipAddress: "192.168.1.100",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  createdAt: "2024-04-19T10:30:00.000Z",
  updatedAt: "2024-04-19T10:30:00.000Z"
};
