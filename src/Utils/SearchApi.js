class SearchUser {
  constructor(query, queryStr) {
      this.query = query,
      this.queryStr = queryStr;
  }

  
  searchedUser() {
    
    const search = this.queryStr.search
      ? {
          name: {
            $regex: this.queryStr.search,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({...search});

    return this;
  }
}

export default SearchUser;
