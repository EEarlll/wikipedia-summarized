export interface Query {
  query: {
    searchinfo: {
      totalhits: number;
      suggestion: string;
      suggestionsnippet: string;
    };
    search: Array<{
      ns: number;
      title: string;
      pageid: number;
      size: number;
      wordcount: number;
      snippet: string;
      timestamp: string;
    }>;
  };
}

export interface ArticleInterface {
  title: string;
  extract: string;
  original?: {
    source: string;
    width: number;
    height: number;
  };
  images?: Array<{
    title: string;
  }>;
}
