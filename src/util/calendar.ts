export const getCalendarList = (
  events: gapi.client.calendar.CalendarListResource
) => {
  if (events) {
    events.list().then((res) => console.log(res));
  }
};
export const getCalendar = (events: gapi.client.calendar.CalendarsResource) => {
  if (events) {
    events
      .get({
        calendarId: 'c_6lcarsarjjgh5rcp0n57v0r408@group.calendar.google.com',
      })
      .then((res) => console.log(res));
  }
};

export const addEvent = (event: gapi.client.calendar.Event) => {
  gapi.client.calendar.events
    .insert({
      calendarId: 'c_6lcarsarjjgh5rcp0n57v0r408@group.calendar.google.com',
      resource: event,
    })
    .execute((event: any) => {
      console.log(event);
      window.open(event.htmlLink);
    });
};

export const updateEvent = (event: gapi.client.calendar.Event) => {
  gapi.client.calendar.events
    .update({
      calendarId: 'c_5sdjgce7p0rmp4m65v21ml2lac@group.calendar.google.com',
      resource: event,
      eventId: '',
    })
    .execute((event: any) => {
      console.log(event);
      window.open(event.htmlLink);
    });
};
