import React from 'react'
import { Form, FormControl } from "react-bootstrap";

const SearchForm = ({ searchInput, handleSearchInputChange, handleSubmit }) => {
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormControl type="text" placeholder="Search" className="search-form"
                    value={searchInput}
                    onChange={handleSearchInputChange} />
            </Form>
        </div>
    )
}

export default SearchForm
