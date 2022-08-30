import './App.css';
import styled from '@emotion/styled';
import { gapi, loadAuth2 } from 'gapi-script';
import { useEffect, useState } from 'react';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100vh;
  align-items: center;
`;

const event: gapi.client.calendar.Event = {
  summary: '히루가 지났는데 구글 계정이 붙어있는가?',
  location: '강남역 7번출구',
  description:
    '디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션디스크립션 디스크립션',
  start: {
    dateTime: '2022-08-30T20:23:32',
    timeZone: 'Asia/Seoul',
  },
  end: {
    dateTime: '2022-08-30T21:21:22',
    timeZone: 'Asia/Seoul',
  },
  attendees: [{ email: 'june6723@rubric.im' }],
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

      console.log(gapi);

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

  const login = async () => {
    await gapi.auth2.getAuthInstance().signIn();
    location.href = '';
  };

  const logout = async () => {
    await gapi.auth2.getAuthInstance().signOut();
    location.href = '';
  };

  const sendEvent = () => {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: REACT_APP_API_KEY,
        clientId: REACT_APP_CLIENT_ID,
        discoveryDocs: [REACT_APP_DISCOVERY_DOCS ?? ''],
        scope: REACT_APP_SCOPES,
      });

      gapi.client.load('calendar', 'v3', () => {
        gapi.client.calendar.events
          .insert({
            calendarId: 'primary',
            resource: event,
          })
          .execute((event: any) => {
            console.log(event);
            window.open(event.htmlLink);
          });
      });
    });
  };

  return (
    <div className="App">
      <Wrap>
        {googleAccountInfo ? (
          <>
            <p>currentUser: {googleAccountInfo.name}</p>
            <p onClick={() => sendEvent()}>makeEvent</p>
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
