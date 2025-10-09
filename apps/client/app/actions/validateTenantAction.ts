'use server';

export async function validateTenant({
  tenantName,
}: {
  tenantName: string | undefined;
}) {
  if (!tenantName) {
    return null;
  }
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/Invent3Pro/Companies/ValidateTenant/${tenantName}`
    );

    if (!response.ok) {
      console.error(
        `Failed to validate tenant: ${response.status} ${response.statusText}`
      );
      return null;
    }
    const tenantData = await response.json();

    return { tenantData: tenantData?.data };
  } catch (error) {
    console.error('Error validating tenant:', error);
  }
}
