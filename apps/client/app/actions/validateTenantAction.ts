'use server';

export async function validateTenant({ tenantName }: { tenantName: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/Companies/GetTenantInfo/${tenantName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to validate tenant: ${response.status} ${response.statusText}`
      );
      return;
    }
    const tenantData = await response.json();

    return { tenantData: tenantData?.data };
  } catch (error) {
    console.error('Error validating tenant:', error);
  }
}
