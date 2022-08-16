import React from 'react'
import { useNavigate } from 'react-router-dom'

export const MenuCard = ({content, link}) => {
    const navigate = useNavigate();

    return (
    <div className="menuCard" onClick={() => {link && navigate(link)}}>

        {content}
    </div>
  )
}
