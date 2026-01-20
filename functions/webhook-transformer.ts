/**
 * Webhook Transformer Function
 * Intercepts JotForm submissions and transforms them for Odoo
 * Fixes location field and maps field names correctly
 */

export const onRequest: PagesFunction = async (context) => {
  // Only handle POST requests
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // Parse the incoming JotForm data
    const formData = await context.request.formData();
    const data: Record<string, string> = {};

    // Convert FormData to object
    for (const [key, value] of formData) {
      data[key] = value as string;
    }

    console.log("Received JotForm data:", data);

    // Transform JotForm field names to Odoo expected format
    const transformedData = transformJotFormData(data);

    console.log("Transformed data:", transformedData);

    // Send to Odoo webhook
    const odooWebhookUrl =
      "https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b";

    const odooResponse = await fetch(odooWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
    });

    if (!odooResponse.ok) {
      console.error("Odoo webhook error:", odooResponse.status, await odooResponse.text());
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to process webhook",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook processed successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
};

/**
 * Transform JotForm data to Odoo format
 * Maps field names and fixes values
 */
function transformJotFormData(jotFormData: Record<string, string>): Record<string, unknown> {
  // Map form field names to Odoo field names
  // Based on standalone trial form field names
  const fieldMapping: Record<string, string> = {
    // Name field variations
    name: "full_name",
    fullName: "full_name",
    full_name: "full_name",
    
    // Email field variations
    email: "email",
    workEmail: "email",
    work_email: "email",
    
    // Phone field variations
    phone: "phone",
    mobile: "phone",
    
    // Company field variations
    company: "company_name",
    companyName: "company_name",
    company_name: "company_name",
    
    // Location field (exact from form)
    location: "server_location",
    serverLocation: "server_location",
    server_location: "server_location",
  };

  const transformed: Record<string, unknown> = {
    source: "jotform_free_trial",
    timestamp: new Date().toISOString(),
  };

  // Transform each field - keep all values as received from JotForm
  for (const [jotKey, odooKey] of Object.entries(fieldMapping)) {
    const value = findFieldValue(jotFormData, jotKey);
    if (value !== null && value !== undefined && value !== "") {
      // Fix location field: convert "nl-meppel" to "meppel" for database identification
      if (jotKey === "location" || jotKey === "serverLocation" || jotKey === "server_location") {
        const fixedLocation = fixLocationValue(value);
        transformed[odooKey] = fixedLocation;
        // Add database identifier based on location
        transformed.database_id = getDatabaseId(fixedLocation);
      } else {
        transformed[odooKey] = value;
      }
    }
  }

  // Include any additional JotForm metadata
  if (jotFormData.submissionID) {
    transformed.submission_id = jotFormData.submissionID;
  }

  if (jotFormData.formID) {
    transformed.form_id = jotFormData.formID;
  }

  return transformed;
}

/**
 * Find field value by trying multiple possible keys
 * JotForm uses various naming conventions (q_fieldname, fieldname, etc)
 */
function findFieldValue(data: Record<string, string>, fieldName: string): string | null {
  // Lowercase version for comparison
  const lowerFieldName = fieldName.toLowerCase();

  // Try exact match first
  if (data[fieldName]) return data[fieldName];

  // Try lowercase exact match
  if (data[lowerFieldName]) return data[lowerFieldName];

  // Try with q prefix (JotForm API format: q_fieldname)
  if (data[`q_${lowerFieldName}`]) return data[`q_${lowerFieldName}`];
  if (data[`q${fieldName}`]) return data[`q${fieldName}`];

  // Try with brackets notation (JotForm form data)
  if (data[`q[${lowerFieldName}]`]) return data[`q[${lowerFieldName}]`];

  // Try camelCase variations
  const camelCase = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
  if (data[camelCase]) return data[camelCase];

  // Try snake_case variations  
  const snakeCase = fieldName.replace(/([A-Z])/g, "_$1").toLowerCase();
  if (data[snakeCase]) return data[snakeCase];
  if (data[`q_${snakeCase}`]) return data[`q_${snakeCase}`];

  // Try finding by partial match (as fallback)
  for (const [key, value] of Object.entries(data)) {
    const keyLower = key.toLowerCase().replace(/[q_[\]]/g, "");
    if (keyLower.includes(lowerFieldName) || lowerFieldName.includes(keyLower)) {
      if (value && value !== "") return value;
    }
  }

  return null;
}

/**
 * Fix location field values
 * Normalizes location values from the form
 */
function fixLocationValue(location: string): string {
  if (!location) return location;

  // Normalize to lowercase for consistency
  const normalized = location.trim().toLowerCase();
  
  console.log(`Location received: ${location} → normalized: ${normalized}`);
  
  return normalized;
}

/**
 * Get database identifier based on location
 * Helps Odoo easily identify which database instance to spin up
 * Maps exact location names from the form dropdown
 */
function getDatabaseId(location: string): string {
  const location_lower = location.trim().toLowerCase();

  // Database mapping for exact form values (standalone trial form)
  const databaseMap: Record<string, string> = {
    // Exact values from form dropdown
    manchester: "manchester_eu_1",
    boston: "boston_us_1",
    mumbai: "mumbai_asia_1",
    saopaulo: "saopaulo_br_1",
    meppel: "meppel_eu_1",
  };

  // Return mapped database ID
  if (databaseMap[location_lower]) {
    return databaseMap[location_lower];
  }

  // Fallback: generate database ID from location
  const dbId = location_lower.replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
  return `${dbId}_db_1`;
}
