import './App.css';
import styled from '@emotion/styled';
import { gapi, loadAuth2 } from 'gapi-script';
import { useEffect, useState } from 'react';
import { addEvent, getCalendar, getCalendarList } from './util/calendar';
import { login, logout } from './util/auth';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100vh;
  align-items: center;
`;

const event: gapi.client.calendar.Event = {
  summary: '오너가 그만둠',
  location: '인덕원역',
  description: '기존 오너가 구독 취소함, 나는 변경 권한이 있음. 결과는?',
  start: {
    date: '2022-08-30',
    timeZone: 'Asia/Seoul',
  },
  end: {
    date: '2022-08-30',
    timeZone: 'Asia/Seoul',
  },
  attendees: [{ email: 'solgo123@rubric.im' }],
  reminders: {
    useDefault: false,
    // overrides: [
    //   { method: 'email', minutes: 24 * 60 },
    //   { method: 'popup', minutes: 10 },
    // ],
  },
};

type GoogleBasicProfile = {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  imageUrl: string;
  email: string;
};
const {
  REACT_APP_CLIENT_ID,
  REACT_APP_API_KEY,
  REACT_APP_SCOPES,
  REACT_APP_DISCOVERY_DOCS,
} = process.env;
function App() {
  const [googleAccountInfo, setGoogleAccountInfo] =
    useState<GoogleBasicProfile>();

  const setAuth2 = async () => {
    if (REACT_APP_CLIENT_ID) {
      await loadAuth2(gapi, REACT_APP_CLIENT_ID, '');
    }
  };

  useEffect(() => {
    setAuth2().then(() => {
      const user = gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile();

      setGoogleAccountInfo({
        id: user.getId(),
        name: user.getName(),
        givenName: user.getGivenName(),
        familyName: user.getFamilyName(),
        imageUrl: user.getImageUrl(),
        email: user.getEmail(),
      });
    });
  }, [gapi]);

  useEffect(() => {
    if (googleAccountInfo) {
      gapi.load('client', () => {
        gapi.client.init({
          apiKey: REACT_APP_API_KEY,
          clientId: REACT_APP_CLIENT_ID,
          discoveryDocs: [REACT_APP_DISCOVERY_DOCS ?? ''],
          scope: REACT_APP_SCOPES,
        });

        gapi.client.load('calendar', 'v3', () => console.log('im ready'));
      });
    }
  }, [googleAccountInfo]);

  return (
    <div className="App">
      <Wrap>
        {googleAccountInfo ? (
          <>
            <p>currentUser: {googleAccountInfo.name}</p>
            <p onClick={() => addEvent(event)}>makeEvent</p>

            <b
              onClick={() => {
                console.log(gapi);
                getCalendarList(gapi.client.calendar.calendarList);
              }}
            >
              getCalendarList
            </b>
            <b
              onClick={() => {
                console.log(gapi);
                getCalendar(gapi.client.calendar.calendars);
              }}
            >
              getCalendars
            </b>
            <p onClick={() => logout()}>logout</p>
          </>
        ) : (
          <p onClick={() => login()}>login</p>
        )}
      </Wrap>
    </div>
  );
}

export default App;
