import { getAuthenticatedUserProfile } from '@/lib/data';
import { redirect } from 'next/navigation';
import UserProfile from '@/components/features/profile/UserProfile';

export default async function ProfilePage() {
    const user = await getAuthenticatedUserProfile();

    if (!user) {
        redirect('/login');
    }

    return (
    <div>
        <UserProfile userData={user} />
    </div>)
}