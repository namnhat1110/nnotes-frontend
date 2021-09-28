import React, { useState } from 'react';
import TagsInput from 'react-tagsinput'

import './style.css'

function TagsForm() {
    const [tags, setTags] = useState([])
    console.log("tags", tags)

    const handleChangeTag = (tags) => {
        setTags(tags)
    }
    return (
        <TagsInput
            value={tags}
            onChange={handleChangeTag}
        />
    )
}
export default TagsForm;