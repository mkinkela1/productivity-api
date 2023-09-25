enum Language {
  EN = "EN",
  HR = "HR",
}

type Message = Record<Language, string>;

export const UserNotFound: Message = {
  [Language.EN]: "User not found.",
  [Language.HR]: "Korisnik nije pronađen.",
};

export const EmailAlreadyExists: Record<Language, string> = {
  [Language.EN]: "Email already exists.",
  [Language.HR]: "E-mail već postoji.",
};
