const standardEmail =
  /^(?!.+@(gmail|yandex|icloud|rambler|ukr|pochta|zoho|gmx|yahoo|outlook|proton|aol|guerilla|mail|mailfence|hotmail|msn|bluehost|fastmail|godady|namecheap|tutanota|posteo|mailbox|kolab|gawab|pookmail|mail.tut.by|spam|a.ua|inet|bigmailbox|mail.ru|inbox.ru|list.ru|bk.ru|internet.ru)\..+)(.+@.+\..+)$/;

export const isStandardEmail = (value: string): boolean =>
  standardEmail.test(value);

export const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const mediumPassword = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/;

export const rulesCheckpoints = [
  { text: 'One lowercase character', check: /[a-z]+/ },
  { text: 'One uppercase character', check: /[A-Z]+/ },
  { text: '8 characters minimum', check: /^.{8,}$/ },
  { text: 'Special character', check: /[^a-zA-Z0-9]+/ },
  { text: 'At least One digit', check: /\d+/ },
];
