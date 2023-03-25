import React from 'react'

export default function TeamMemberItem({ member }) {
    const { name, avatar, id } = member;
    return (
        <div class="checkbox-container">
            <img src={`.${avatar}`} class="team-avater" />
            <p class="label">{name}</p>
        </div>
    )
}
