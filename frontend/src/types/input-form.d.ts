type CounterType = {
  id: number;
  sentence_id: number;
  created_at: Date;
};

type SentenceType = {
  id: number;
  text: string;
  num_of_word: number;
  translation: string;
  counters: CounterType[];
};

type SentenceFormType = {
  text: string;
  translation: string;
};
