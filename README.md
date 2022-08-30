# Google Oauth2(implicit) / Calendar api 심플 연동

## dependencies

```typescript
// CDN 임포트 대체로 gapi-script 사용
"gapi-script": "^1.2.0",
"@types/gapi": "^0.0.42",
// 사용하는 api 별 타입
"@types/gapi.auth2": "^0.0.56",
"@types/gapi.client.calendar": "^3.0.10",
```

- client-side 로 서버 토큰 발급 과정 없음

<br/>

---

<br/>

### Google Calendar Api 관련 용어 정리

- Event
  - 단일 이벤트에 대한 정의로 가장 하위단에 속하는 개념입니다.
    1. 타이틀
    2. 시작일
    3. 종료일
    4. 반복 여부 (recursive)
    5. [참석자 초대 관련 링크](https://developers.google.com/calendar/api/concepts/sharing)
  - [EventResource DTO](https://developers.google.com/calendar/api/v3/reference/events#resource-representations) 링크 참조
- Calendar
  - Event 객체의 집합의 개념으로 각각의 메타데이터를 설정할 수 있습니다.
    1. Id
    2. 타임존
    3. 설명 등
  - [CalendarResource DTO](https://developers.google.com/calendar/api/v3/reference/calendars) 링크 참조
- Calendar List

  - Calendar 객체의 리스트 개념으로, 사용자의 캘린더 목록입니다. 유저 property 속성, 캘린더 별 설정 등이 메타데이터로 포함 되어있습니다.
    1. 알람 설정
    2. Primary: boolean
    3. accessrole 등
  - [CalendarListResource DTO](https://developers.google.com/calendar/api/v3/reference/calendarList) 링크 참조

- Setting
  - 전반적인 설정에 관련한 객체임
    1. User preference
    2. User timezone
  - [SettingResource DTO](https://developers.google.com/calendar/api/v3/reference/settings) 링크 참조
- ACL
  - 유저 / 그룹에 대한 access level, access control rule 에 관련된 객체
  - [ACLResource DTO](https://developers.google.com/calendar/api/v3/reference/acl) 링크 참조

<br/>

관련문서

> https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow<br/> > https://developers.google.com/calendar/api/concepts
