import React from 'react'
import { useGetTeamsQuery } from '../features/api/apiSlice';
import TeamMemberItem from './TeamMemberItem';

export default function TeamMembers() {
    const { data, isLoading, isError, error, isSuccess } = useGetTeamsQuery();
    console.log(data, isLoading);
    let content = null;
    if (data?.length > 0) {
        content = data.map((el) => <TeamMemberItem key={el.id} member={el} />);
    }
    return (
        <div class="mt-8">
            <h3 class="text-xl font-bold">Team Members</h3>
            <div class="mt-3 space-y-4">
                {content}
            </div>
        </div>
    )
}
