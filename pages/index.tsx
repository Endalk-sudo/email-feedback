import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the waiting list page
    router.push('/waiting-list');
  }, [router]);

  return null; // Return null since we are redirecting
}