enum Language {
  EN = "EN",
  HR = "HR",
}

type Message = Record<Language, string>;

export const UserNotFound: Message = {
  [Language.EN]: "User not found.",
  [Language.HR]: "Korisnik nije pronađen.",
};

export const EmailAlreadyExists: Message = {
  [Language.EN]: "Email already exists.",
  [Language.HR]: "E-mail već postoji.",
};

export const EventCategoryNotFound: Message = {
  [Language.EN]: "Event category not found.",
  [Language.HR]: "Kategorija događaja nije pronađena.",
};
