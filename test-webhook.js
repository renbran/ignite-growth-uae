/**
 * Test script for Odoo4Projects Webhook
 * Tests all server locations to verify payload format
 */

const webhookUrl = "https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b";

const locations = ["manchester", "boston", "mumbai", "saopaulo", "meppel"];

async function testWebhook(location) {
  const payload = {
    name: "Test User - " + location.toUpperCase(),
    email: `test-${location}@example.com`,
    phone: "+971501234567",
    company: "Test Company Ltd",
    server_location: location,
    send_confirmation: true,
    timestamp: new Date().toISOString(),
  };

  console.log(`\n🧪 Testing location: ${location}`);
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    let responseData;
    
    try {
      responseData = await response.text();
    } catch (e) {
      responseData = "No response body";
    }

    console.log(`📡 Response Status: ${status}`);
    console.log(`📄 Response Body: ${responseData}`);
    
    if (status >= 200 && status < 300) {
      console.log("✅ SUCCESS");
    } else {
      console.log(`⚠️  Non-2xx status: ${status}`);
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

async function runTests() {
  console.log("🚀 Starting Odoo4Projects Webhook Tests");
  console.log("🔗 Webhook URL:", webhookUrl);
  console.log("=" .repeat(60));

  for (const location of locations) {
    await testWebhook(location);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between tests
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ All tests completed!");
}

runTests();
