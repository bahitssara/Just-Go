import React from 'react';

const ThisWeekContext = React.createContext({
    events: [],
    error: null,
    user: '',
    deleteEvent: () => {},
    addEvent: () => {},
    editEvent: () => {},
})

export default ThisWeekContext;