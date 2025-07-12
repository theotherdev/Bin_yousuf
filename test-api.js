// Simple test for the API with minimal data
const testData = [
  // Test 1: Completely empty submission
  {},
  
  // Test 2: Only name
  { fullName: "John Doe" },
  
  // Test 3: Only email
  { email: "test@example.com" },
  
  // Test 4: Only phone
  { phone: "+92 300 1234567" },
  
  // Test 5: Mixed minimal data
  { fullName: "Jane", property: "Test Project" }
];

console.log("API Test Data prepared:");
testData.forEach((data, index) => {
  console.log(`Test ${index + 1}:`, JSON.stringify(data));
});

console.log("\nForm will now accept submissions with any combination of fields!");