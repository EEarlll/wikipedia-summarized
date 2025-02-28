export interface Query {
  query: {
    searchinfo: {
      totalhits: number;
      suggestion?: string;
      suggestionsnippet?: string;
    };
    pages: {
      [pageid: string]: Page;
    };
  };
}

export interface Page {
  title: string;
  pageid: number;
  index: number;
  thumbnail?: {
    source?: string;
    width: number;
    height: number;
  };
  description?: string;
  extract?: string;
  touched?: string;
}

export interface ArticleInterface {
  title: string;
  extract: string;
  original?: {
    source: string;
    width: number;
    height: number;
  };
  image: string;
  links?: Array<string>;
}
