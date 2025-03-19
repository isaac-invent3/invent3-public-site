'use server';
export const NEXT_PUBLIC_BASE_URL = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || 'missing';
};

export const NEXT_PUBLIC_API_URL = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'missing';
};
